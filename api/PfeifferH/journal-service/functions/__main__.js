
/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/
let admin = require('firebase-admin')

let serviceAccount = require('../../../../settings.json')

module.exports = async (name = 'world', context) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://journalagent-db480.firebaseio.com"
  })
  return `hello ${name}`;
};
