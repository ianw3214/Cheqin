
/**
* Runs the Firestore Authentication 
* @param {string} settingsPath Path to settings.json
* @returns {object} 
*/


module.exports = async (settingsPath='../../../../settings.json', context) => {

  let admin = require('firebase-admin')
  let serviceAccount = require(settingsPath)
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://journalagent-db480.firebaseio.com'
  })

  return admin
};
