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


Screenshots:

![image](https://github.com/user-attachments/assets/fdced12d-552e-49b9-b6d6-b91d5fff9d59)

![image](https://github.com/user-attachments/assets/999afdb6-04bf-4830-8645-cc7ce663a05b)

![image](https://github.com/user-attachments/assets/09e8e91c-0e45-401d-b0b2-741920ec655c)

![image](https://github.com/user-attachments/assets/a7a3f66b-79cf-48e8-bf5b-7373afcf8447)

![image](https://github.com/user-attachments/assets/02d4c2d4-9911-48cc-bae6-f982da69654a)

![image](https://github.com/user-attachments/assets/e661181f-b4b8-4050-b35f-05c1a5248aca)

![image](https://github.com/user-attachments/assets/23bdefe5-2ee9-4c2f-8e38-d4a518a55508)

![image](https://github.com/user-attachments/assets/158fa4c9-3d07-4a91-b50a-a4be01626d90)

![image](https://github.com/user-attachments/assets/73c2911a-c58b-4cd1-a210-ec0855ebe5f4)

![image](https://github.com/user-attachments/assets/a4b2044f-a70d-48a9-992c-1f9a3603e914)

![image](https://github.com/user-attachments/assets/ca4c366e-62d9-45c7-88dc-cee40627f5c2)

![image](https://github.com/user-attachments/assets/fa40ba48-9f0f-4ee5-a139-76b5975be247)

![image](https://github.com/user-attachments/assets/8b69d97d-e73b-4420-b51d-0c5ba41788d4)

![image](https://github.com/user-attachments/assets/59beaf9b-1af8-4ee6-ae7e-6be2b595861d)

![image](https://github.com/user-attachments/assets/489eef48-04b3-40f5-a86e-4d0ace5d6218)

![image](https://github.com/user-attachments/assets/ba0792df-5f71-44f5-b69c-6027218e7500)

![image](https://github.com/user-attachments/assets/da6913b3-74ad-49c5-ab72-3f3d396aa320)

![image](https://github.com/user-attachments/assets/3c7b0cb3-5bd4-43ee-ab3a-45912ab38684)

![image](https://github.com/user-attachments/assets/111338ea-08ab-4731-a27b-c101495da413)

![image](https://github.com/user-attachments/assets/a0df013d-e884-40f5-994f-45029c27c99d)


🙌 Acknowledgements
MDN Web Docs

Express.js

Mongoose

jQuery

[Open Source Community ❤️]




