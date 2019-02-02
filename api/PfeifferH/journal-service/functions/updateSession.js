
/**
* Runs the Firestore Authentication
* @param {string} userId
* @param {string} sessionId
* @param {string} text User inputted text
* @param {Array} emotions Emotion array of length 6
* @param {string} settingsPath Path to settings.json
*/


module.exports = async (userId, sessionId, text, emotions=null, settingsPath='../../../../settings.json', context) => {

  let admin = require('firebase-admin')
  let serviceAccount = require(settingsPath)
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://journalagent-db480.firebaseio.com'
  })

  const db = admin.firestore()
  const ref = db.collection('users/' + userId + '/sessions/').doc(sessionId)
  
  let data = emotions !== null ? { emotions: emotions, text: text } : { text: text } //Set emotions if inputted
  
  await ref.set(data, { merge: true })

}
