
/**
* Updates a session object
* @param {string} userToken user token to verify
* @param {string} sessionId Session Id
* @param {string} text User inputted text
* @param {string} emotions Emotion array of length 5 base64 encoded
*/

let admin = require('firebase-admin')
let serviceAccount = {
  
}




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://journalagent-db480.firebaseio.com'
})

module.exports = async (sessionId='', userToken='', userId=null, text='', emotions=null, context) => {
  
  if(emotions) {
    emotionsDecoded = Buffer.from(emotions, 'base64').toString('ascii')
    emotionsObject = JSON.parse(emotionsDecoded)
  }

  if(!userId) {
    userId = ''
    await admin.auth().verifyIdToken(userToken)
    .then((decodedToken) => {
      userId = decodedToken.uid;  
    }).catch((error) => {
      console.log('Error: Unauthorized user token')
      return
    });
  }

  const db = admin.firestore()
 
  if(!sessionId) {
    await db.collection('users/' + userId + '/sessions/').add({})
    .then(doc => {
      sessionId = doc.id      
    })
  }
  const ref = db.collection('users/' + userId + '/sessions/').doc(sessionId)
  
  if(emotions != null && Object.keys(emotionsObject).length !== 5) {
    throw new Error('Error: length of emotions array does not match schema')
  }
 
  let data = emotions !== null ? { emotions: emotionsObject, text: text } : { text: text } //Set emotions if inputted
  
  await ref.set(data, { merge: true })

}
