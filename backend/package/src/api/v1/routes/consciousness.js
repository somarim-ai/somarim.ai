const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// This should be done only once.
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const usersCollection = db.collection('users');

const consciousnessTracker = {
  async getUserState(userId) {
    console.log(`Fetching or creating consciousness state for user ${userId}`);
    const userRef = usersCollection.doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      console.log(`No user found for ${userId}. Creating new profile.`);
      const newUser = {
        userId: userId,
        createdAt: new Date().toISOString(),
        awarenessLevel: 'Beginner',
        meditationSessions: [],
        progressMetrics: {
          totalTime: 0,
          sessionCount: 0,
          deepFocusTime: 0
        }
      };
      await userRef.set(newUser);
      return { 
        status: 'new_profile_created',
        userData: newUser
      };
    } else {
      console.log(`Found user ${userId}.`);
      return { 
        status: 'user_profile_retrieved',
        userData: doc.data()
      };
    }
  }
};

router.get('/user-state', async (req, res, next) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'A valid userId is required.' });
  }
  try {
    const result = await consciousnessTracker.getUserState(userId);
    res.json(result);
  } catch (error) {
    console.error("Error accessing user state in Firestore:", error);
    next(error); // Pass error to the central error handler
  }
});

module.exports = router;
