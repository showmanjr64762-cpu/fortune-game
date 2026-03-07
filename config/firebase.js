// config/firebase.js
const admin = require("firebase-admin");

// Initialize Firebase only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY
        ? process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined,
    }),
    databaseURL: process.env.FB_DATABASE_URL,
  });
}

const db = admin.database();
console.log("✅ Firebase initialized successfully");

module.exports = db;