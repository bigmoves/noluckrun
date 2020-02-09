import * as admin from 'firebase-admin';

export const addRegistration = ({
  firstName = 'chad',
  lastName = 'miller',
  eventData
}) => {
  const firebasePrivateKey =
    process.env.NODE_ENV === 'production'
      ? Buffer.from(process.env.FIREBASE_PRIVATE_KEY, 'base64').toString(
          'ascii'
        )
      : process.env.FIREBASE_PRIVATE_KEY;

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // https://stackoverflow.com/a/41044630/1332513
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n')
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  }

  return admin
    .firestore()
    .collection('registrations')
    .add({
      firstName,
      lastName,
      eventData
    })
    .then(ref => {
      return {
        id: ref.id
      };
    });
};
