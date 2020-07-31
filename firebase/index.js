const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Initialize the firebase-admin SDK module
admin.initializeApp(functions.config().firebase);

// Set the Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Handle push notifications request
app.post("/pushNotifications", require("./controllers/pushNotifications"));

// Handle another request
// app.post("/anotherRoute", require("./controllers/anotherController"));

// Export the https endpoint API handled by the Express app
export const api = functions.https.onRequest(app);