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
  databaseURL: "https://daily-cheqin.firebaseio.com"
})

module.exports = async (userToken='', userId=null, context) => {
  if(userId === null) {
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
  let query = db.collection('users/'+userId+'/sessions');
 
  return query.get()
    .then(snapshot => {
      let data = [];
      snapshot.forEach(session => {
        data.push([session.id, session.data()])
      })
      console.log(data)
      return data
    })
    .catch(err => {
      return 'Error: ' + err
    })
};
