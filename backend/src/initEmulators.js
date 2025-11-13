const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

(async () => {
  const db = admin.firestore();
  const ref = db.collection("system_status").doc("initial_state");
  await ref.set({
    coherence: 1.0,
    ethics: "aligned",
    timestamp: new Date().toISOString(),
  });
  console.log("✅ Emulator initialized.");
})();
