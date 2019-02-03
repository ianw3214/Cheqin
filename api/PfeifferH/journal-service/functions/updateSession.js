
/**
* Updates a session object
* @param {string} userToken user token to verify
* @param {string} sessionId Session Id
* @param {string} text User inputted text
* @param {Array} emotions Emotion array of length 6
*/

let admin = require('firebase-admin')
let serviceAccount = {
  
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://journalagent-db480.firebaseio.com'
})

module.exports = async (sessionId='', userToken, text='', emotions=null, context) => {

  let userId = ''
  await admin.auth().verifyIdToken(userToken)
  .then((decodedToken) => {
    userId = decodedToken.uid;  
  }).catch((error) => {
    console.log('Error: Unauthorized user token')
    return
  });

  const db = admin.firestore()
  const ref = db.collection('users/' + userId + '/sessions/').doc(sessionId)
  
  emotions = emotions.map(Number) //Force elements to be of number type

  if(emotions != null && emotions.length !== 6) {
    throw new Error('Error: length of emotions array does not match schema')
  }

  let data = emotions !== null ? { emotions: emotions, text: text } : { text: text } //Set emotions if inputted
  
  await ref.set(data, { merge: true })

}
