
/**
* Retrieves a user's global attributes
* @param {string} userToken user token to validate
* @returns {object} Document Data
*/

let admin = require('firebase-admin')
let serviceAccount = {
  
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://daily-cheqin.firebaseio.com"
})

module.exports = async (userToken='', context) => {
  
  let userId = ''
  await admin.auth().verifyIdToken(userToken)
  .then((decodedToken) => {
    userId = decodedToken.uid;  
  }).catch((error) => {
    console.log('Error: Unauthorized user token')
  });

  const db = admin.firestore()
  const ref = db.collection('users').doc(userId)


  let data = {}
  await ref.get()
    .then(doc => {
      data = doc.data()
    })
    .catch(err => {
      console.log('Error getting document ' + err)
      return null
    })
  
  if(data) return data
};
