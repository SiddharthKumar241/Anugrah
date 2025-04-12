const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const fs = require("fs");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kumarsiddharth166@gmail.com',
        pass: 'fxtwnobwbcjnglfs' // your app password (no spaces)
    }
});


mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/foodDonation", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

const donationSchema = new mongoose.Schema({
    item: String,
    description: String,
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" }
    },
    image: String,
    createdAt: { type: Date, default: Date.now },
    username: String,
    email: String
});
donationSchema.index({ location: "2dsphere" });
const Donation = mongoose.model("Donation", donationSchema);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: { type: String, unique: true },
    password: String,
    latitude: Number,
    longitude: Number
});
const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge:5 * 60 * 1000 //5minutes
    }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({ createParentPath: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/donor", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "public", "donor.html"));
});

app.get("/user-location", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "User not logged in" });
    }
    res.json({
        latitude: req.session.user.latitude,
        longitude: req.session.user.longitude
    });
});

app.get("/receiver", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "receiver.html"));
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, username, password, latitude, longitude } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send("Username is already taken.");

        const user = new User({ name, email, username, password, latitude, longitude });
        await user.save();
        res.send("User registered successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving user.");
    }
});
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid username");
        if (user.password !== password) return res.status(400).send("Invalid password.");

        req.session.user = user;
        res.send("Login successful!");
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Internal server error.");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Logout failed");
        }
        res.clearCookie("connect.sid"); // Optional: clear session cookie
        res.send("Logged out successfully");
    });
});


app.post("/donor", async (req, res) => {
    if (!req.session.user) return res.status(401).send("You must be logged in to donate.");

    const { item, description, latitude, longitude } = req.body;
    let imagePath = "";
    const { username, email } = req.session.user;

    if (req.files && req.files.image) {
        const image = req.files.image;
        const uploadDir = path.join(__dirname, "public", "uploads");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const fileName = Date.now() + path.extname(image.name);
        imagePath = "/uploads/" + fileName;
        await image.mv(path.join(uploadDir, fileName));
    }

    const donation = new Donation({
        item,
        description,
        location: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        image: imagePath,
        username,
        email
    });

    try {
        await donation.save();
        res.send("Donation submitted successfully!");
    } catch (err) {
        res.status(500).send("Error saving donation.");
    }
});

app.post("/receiver", async (req, res) => {
    const { latitude, longitude, itemNeeded } = req.body;
    if (!latitude || !longitude) return res.status(400).send("Latitude and longitude are required.");

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lon)) return res.status(400).send("Invalid latitude or longitude.");

    const maxDistance = 10000; 

    try {
        const query = {
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [lon, lat] },
                    $maxDistance: maxDistance
                }
            }
        };

        if (itemNeeded && itemNeeded.trim() !== "") {
            query.item = new RegExp(itemNeeded, "i");
        }

        const donations = await Donation.find(query);
        res.json(donations);
    } catch (err) {
        console.error("Error in /receiver:", err);
        res.status(500).send("Error retrieving donations.");
    }
});

app.get("/all-donations", async (req, res) => {
    try {
        const donations = await Donation.find({}); 

        if (!donations || donations.length === 0) {
            console.log("No donations found.");
            return res.json([]);
        }

        const plainDonations = donations.map(donation => donation.toObject());
        const filePath = path.join(__dirname, "datastore.json");
        fs.writeFileSync(filePath, JSON.stringify(plainDonations, null, 2), "utf-8");

        console.log("Sending donations:", donations); 
        res.json(donations);
    } catch (err) {
        console.error("Error retrieving donations:", err); 
        res.status(500).json({ error: "Error retrieving donations." }); 
    }
});

app.get("/check-session", (req, res) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;

    const mailOptions = {
        from: 'kumarsiddharth166@gmail.com',
        to,
        subject,
        html: `
            <div style="font-family: 'Segoe UI', sans-serif; background: #f7fff5; padding: 20px; border-radius: 8px; border: 1px solid #d2ffd2;">
                <h2 style="color: #4CAF50;">🌿 Food Donation Request</h2>
                <p style="font-size: 16px; color: #333;">${message}</p>
                <p style="margin-top: 20px; font-size: 14px; color: #888;">Please respond if you're able to help. Thank you for supporting our community.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send("Email sent successfully!");
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).send("Failed to send email.");
    }
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});