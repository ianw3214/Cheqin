/**
* Retrieves a user's session data
* @param {string} sessionId Doc Id to retrieve
* @param {string} userToken User token to verify
* @returns {object} Document Data
*/

let admin = require('firebase-admin')
let serviceAccount = {
  
  "type": "service_account",
  "project_id": "journalagent-db480",
  "private_key_id": "42cdc093d35ca44223b3bc58c1ae378a7fb81ad5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDfF2LPMNFSV+Ne\n0HrRasIhI4zTsUUfWpLGD58Wi+ur6l62atXCSyVJ4qvuq4nDyL3LCQC9HfoZzVC3\newvuC+QLr4xAChsHp/cDakT2vaUukJgqQ7/RIVFO+Za+zshzbi7/an68ETMzcGXq\n+WgLuZ2De35p/naAboiRsHL6Bp/18uC6z8mXXdF07gqKoL0kOQjuMkgo+h0Buh88\nMhEs7bHWG5DI+l5zLEQAZZWq2sL697oMQ1KNvh6BlbOogMXUrpiqMLutw4e1v/yl\nw/jzH3hSuLSzMbmp+FHEYifVUovsrW+TJKWTtimooBSpUJsYXLAb6M+8f4ZGEAU5\n6ZgX2NC/AgMBAAECggEAZuY+BKwTOKRiMwb9R1+zKB7iI3iGFfascV+eNQOX0gV5\n5zDy5LnNer1rKVyE4EHUzPQbm59ajxElFGRUddmVN5Cio50lp4vhQvl+0sJZkNdP\n4Fq8fIUeIEu+LMdrLNbbJaNkznEuiSDkWZPtWk8kqJNLFS+yT/3rzyswdUOd/45J\nb5vPvOQCd5LKtHEuHfZCZMRnnmbKI5NG/oPt+M3kiRioQVjviyQ+dTZTfoLmAI5M\n1pgPShyqkbJ+p6B2lW1GSUaAaf+5v3vbfjKrlWrz0ZRCnIM5bYvylOtRYbAkyClp\nKS4flZiobihwmB0857Ppc7HGRvmax0rzQUFMxB9oAQKBgQD1slVpZ/pqwvGuJcbV\nm+1OcVthDGu7kwhedxvcL/esY+Dm1cuBNVWZ94NUh9J16iga+BliIqdzcKPG3aD1\niliJ7chM/f2OS4qg8S41b51K4OrlpbUd2LFbqgxAJ3NaX9ompEgidK8GGad1JDdl\n9DiwYaUhKJaY329xuESlvb2ovwKBgQDocl/ZMcqVFA15XA6qK5jYywrWvjFp5wHq\nA8t6Z7dLRH7vxFT2US3MlFVYFaK5zTS+jdcw8fJRh9jKbd5cBL2TEci0VHyU0O0M\nHWkqG8yF+02dUTJJZpnDpHnI7ccFAGBrYAClfXY1FhaVbckDCBfpoJXA7GJ9sqmm\nb876MMbYAQKBgAtxHqEmAnduVKrzf2r7M/XvOX4vgeTeWAluKpH6eeJBVHvrgOqn\nfTEKYcdR++8Z1HxNCYGUc4/gsv/T2mcU5kKmHCnZujEiO3Z7RNegNwcBqm6/ZMvb\nB4dpR+DE9Y5D4HjkNafFH1F9aFsAMMRCt1Efev0sUrcT0LDPEANX7rkpAoGBAOUZ\nPXDjS0iNoA4Z9nYwTBB4ZnFquWcogNF19gnpyVVM6FNGzXqMXjiBhnAvuten8jFR\nuWOLQ4qp+rjhesR1A6e9YnShxLwkA07qeek/xt/S5ReFnKuNjUWviTzJZlt+mImb\n8GcrdeMypwWWVAVB59ejJ5YjJZvACMd68aPTiVgBAoGAGbb32oCy59ruyucQnFDr\nplTMxhhlyHqc8/BopQruWenyJfo2+6b+EQFD2JBhxZew/aFvVOQGJFmp8ODIYhBl\nAWUrwGJlhuCg/EZvQI7qqNcRWOcS80GYNZzFpXEHmLUOhtKrbwidrtml/bCRIevd\nD0166j8MJQAstXqrxY/a3hk=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1g09h@journalagent-db480.iam.gserviceaccount.com",
  "client_id": "104873708233399679459",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1g09h%40journalagent-db480.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://journalagent-db480.firebaseio.com'
})

module.exports = async (sessionId='', userToken, userId, context) => {
  
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