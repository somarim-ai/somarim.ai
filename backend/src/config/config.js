require("dotenv").config();

module.exports = {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "omarim-soe",
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 8080,
};
