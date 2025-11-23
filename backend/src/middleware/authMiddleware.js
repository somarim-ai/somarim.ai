const admin = require('firebase-admin');

if (process.env.NODE_ENV === 'test') {
  const serviceAccount = require('../../serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}

const authMiddleware = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')?.[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error verifying ID token:', error);
    }
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
