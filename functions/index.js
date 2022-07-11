const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();


exports.sendFriendRequest = functions.https.onRequest(async (req, res) => {
  const from = req.body.from;
  const to = req.body.to;

  const sender = await admin.firestore().collection('users').doc(from).get();
  const receiverTokens = await admin.firestore().collection('users').doc(to).get();

  admin.messaging().sendMulticast(
    {
      tokens: receiverTokens.data().tokens,
      notification: {
        title: 'Friend Request',
        body: `${sender.data().name} send you a friend request`
      }
    }
  );

  res.send({});
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
