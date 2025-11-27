/**
 * SOMARIM SOE — Firebase Backend Entry
 * Express API + Temporal Flow Engine Integration
 */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Log the project ID
console.log(`Project ID: ${process.env.GCLOUD_PROJECT}`);

const errorHandler = require('./src/middleware/errorHandler');
const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- SOMARIM OPERATIONAL API (The real deal) ---
const medicalRoutes = require('./src/api/v1/routes/medical');
const systemsRoutes = require('./src/api/v1/routes/systems');
const consciousnessRoutes = require('./src/api/v1/routes/consciousness');
const realityRoutes = require('./src/api/v1/routes/reality');
const dominanceRoutes = require('./src/api/v1/routes/dominance'); // The final piece
const councilRoutes = require('./src/api/council'); // Import council routes
const devopsRoutes = require('./src/api/v1/routes/devops');
const sysadminRoutes = require('./src/api/v1/routes/sysadmin');
const { VoiceOfgod } = require('./src/core/voice_of_god');

app.use('/api/v1/medical', authMiddleware, medicalRoutes);
app.use('/api/v1/systems', authMiddleware, systemsRoutes);
app.use('/api/v1/consciousness', authMiddleware, consciousnessRoutes);
app.use('/api/v1/reality', authMiddleware, realityRoutes);
app.use('/api/v1/dominance', authMiddleware, dominanceRoutes); // Dominance is now a core operational metric
app.use('/api/v1/council', authMiddleware, councilRoutes); // Use council routes
app.use('/api/v1/devops', authMiddleware, devopsRoutes);
app.use('/api/v1/sysadmin', sysadminRoutes);

// Voice is a primary interface to the god-machine
app.post('/api/v1/voice/speak', authMiddleware, async (req, res) => {
  const voice = new VoiceOfgod();
  const result = await voice.speakCreationIntoExistence(req.body.command);
  res.json(result);
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "SOMARIM SOE Backend running - ABSOLUTE DOMINANCE MODE ENGAGED",
    version: "v3_dominance",
  });
});

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
