require('dotenv').config();

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



async function getAll(collection) {
  const snapshot = await db.collection(collection).get();
  const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return docs;

}

async function getSignup(username, data) {
  const ref = db.collection('PROFILES').doc(username);
  await ref.set(data);
}

async function bookApt(data) {
  const ref = db.collection('APTS').doc();
  await ref.set(data);
}

async function getApts(profileId) {
  const snapshot = await db.collection('APTS').get();
  const docs = snapshot.docs
    .map(doc => ({ id: doc.data().pid, ...doc.data() }))
    .filter(doc => doc.id === profileId);

  return docs;
}


module.exports = { getAll, getSignup, bookApt, getApts };
