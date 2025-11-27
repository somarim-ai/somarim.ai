require("dotenv").config();

module.exports = {
  APP_FIREBASE_PROJECT_ID: process.env.APP_FIREBASE_PROJECT_ID,
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
};