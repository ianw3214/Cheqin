/**
* Retrieves a user's session data
* @param {string} userId 
* @param {string} sessionId Doc Id to retrieve
* @param {string} settingsPath 
* @returns {object} Document Data
*/


module.exports = async (userId, sessionId, settingsPath='../../../../settings.json', context) => {
  
  let admin = require('firebase-admin')
  let serviceAccount = require(settingsPath)
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://journalagent-db480.firebaseio.com'
  })

  const db = admin.firestore()
  const ref = db.collection('users/' + userId + '/sessions').doc(sessionId)


  let data = {}
  await ref.get()
    .then(doc => {
      data = doc.data()
    })
    .catch(err => {
      console.log('Error getting document ' + err)
    })
  
  if(data) return data
  else return {}
};