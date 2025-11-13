/**
 * OMARIM SOE — Firebase Backend Entry
 * Express API + Temporal Flow Engine Integration
 */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// --- v1 Routes ---
const biogenesisRoutes = require("./src/api/v1/routes/biogenesis");
const causalRoutes = require("./src/api/v1/routes/causal");

app.use("/api/v1/biogenesis", biogenesisRoutes);
app.use("/api/v1/causal", causalRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "OMARIM SOE Backend running",
    version: "v1",
  });
});

exports.app = functions.https.onRequest(app);
