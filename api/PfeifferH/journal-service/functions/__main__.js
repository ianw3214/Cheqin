
/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/


module.exports = async (name = 'world', context) => {

  let admin = require('firebase-admin')
  let serviceAccount = require('../../../../settings.json')
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://journalagent-db480.firebaseio.com'
  })
  
  const db = admin.firestore()
  const ref = db.collection('users').doc('Xgmr4rdQvID50asl5MVY')
  let getDoc = await ref.get()
    .then(doc => {
      console.log(doc.data())
    })
    .catch(err => {
      console.log('Error getting document ' + err)
    })

  return ''

};
