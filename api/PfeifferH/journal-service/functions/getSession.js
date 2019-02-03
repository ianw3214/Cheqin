/**
* Retrieves a user's session data
* @param {string} sessionId Doc Id to retrieve
* @param {string} userToken User token to verify
* @returns {object} Document Data
*/

let admin = require('firebase-admin')
let serviceAccount = {
  
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://journalagent-db480.firebaseio.com'
})

module.exports = async (sessionId='', userToken, context) => {
  
  let userId = ''
  await admin.auth().verifyIdToken(userToken)
  .then((decodedToken) => {
    userId = decodedToken.uid;  
  }).catch((error) => {
    console.log('Error: Unauthorized user token')
    return
  });

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