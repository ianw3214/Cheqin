/**
* Retrieves an array of the user's sessions
* @param {string} userToken user token to validate
* @returns {Array} Document Data
*/

let admin = require('firebase-admin')
let serviceAccount = {
  
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://journalagent-db480.firebaseio.com'
})

module.exports = async (userToken='', context) => {
  
  let userId = ''
  await admin.auth().verifyIdToken(userToken)
  .then((decodedToken) => {
    userId = decodedToken.uid;  
  }).catch((error) => {
    console.log('Error: Unauthorized user token')
    return
  });
  console.log(userId)
  const db = admin.firestore()
  console.log('users/'+userId+'/sessions')
  let query = db.collection('users/'+userId+'/sessions');
 
  return query.get()
    .then(snapshot => {
      let data = [];
      snapshot.forEach(session => {
        data.push([session.id, session.data()])
      })
      return data
    })
    .catch(err => {
      return 'Error: ' + err
    })
};
