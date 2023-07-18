const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://devter-6661a.firebaseio.com',
  });
} catch (error) {}

export const firestore = admin.firestore();