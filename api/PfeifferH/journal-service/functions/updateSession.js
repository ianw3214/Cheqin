
/**
* Runs the Firestore Authentication
* @param {string} userId
* @param {string} sessionId
* @param {string} text User inputted text 
* @param {string} settingsPath Path to settings.json
*/


module.exports = async (userId, sessionId, text, settingsPath='../../../../settings.json', context) => {

  let admin = require('firebase-admin')
  let serviceAccount = require(settingsPath)
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://journalagent-db480.firebaseio.com'
  })

  const db = admin.firestore()
  const ref = db.collection('users/' + userId + '/sessions/').doc(sessionId)
  let setDoc = await ref.set({ text: text }, { merge: true })

}
