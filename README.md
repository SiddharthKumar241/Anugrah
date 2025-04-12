# Anugrah
A responsive donation form page that allows users to submit item details along with their location and an image, with authentication and logout functionality.

This is a full-stack donation platform that allows users to donate items by submitting a form with item details, images, and location information. It features session-based authentication and supports real-time form validation, location tracking via Geolocation API, and image uploads. The frontend is built using HTML, CSS, JavaScript, and jQuery, while the backend uses Node.js, Express, MongoDB, and Mongoose.

🚀 Features

📦 Donate items with description and optional image upload

- 📍 Automatically fetches donor's current location using the Geolocation API
- ✅ Form validation with real-time feedback
- 🔐 Session-based authentication with cookie storage
- 📤 AJAX-powered form submission (no page reload)
- 🔁 Logout functionality
- 🌐 Clean and responsive UI
- 🗃️ MongoDB used for persistent data storage

- 🛠️ Tech Stack

- **Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)
- jQuery
- AJAX

- 📁 Project Structure

donation-form/
│
├── public/
│   ├── donation.css              # Stylesheet
│   ├── donor.png                 # Favicon/icon
│   └── home.html                 # Optional home page
│
├── views/
│   └── donate.html               # Donation form HTML page
│
├── uploads/                      # Directory for uploaded item images
│
├── models/
│   └── Donor.js                  # Mongoose schema for donor entries
│
├── server.js                     # Main Express server file
├── package.json                  # Node.js dependencies and scripts
└── README.md                     # This file

📷 Screenshots

🧩 Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/donation-form.git
   cd donation-form

Install dependencies

npm install

Setup .env file (if applicable)

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

Start the server
node server.js

Open in browser Visit http://localhost:5000 to access the app.

🧪 Testing
Use the form to submit valid and invalid entries.

Ensure location permission is granted.

Image upload should work for supported formats (e.g., .jpg, .png).

Verify donor data is saved to MongoDB.

📬 API Endpoints

Method	Endpoint	Description
GET	/	Serve home page
GET	/donate	Serve donation form
POST	/donor	Handle form submission (with image and location)
GET	/logout	Destroy session and log out user

🗃️ Database Schema

{
  item: String,
  description: String,
  latitude: Number,
  longitude: Number,
  imagePath: String,
  timestamp: { type: Date, default: Date.now }
}


🙌 Acknowledgements
MDN Web Docs

Express.js

Mongoose

jQuery

[Open Source Community ❤️]




