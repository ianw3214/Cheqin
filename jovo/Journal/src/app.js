'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const {
    App
} = require('jovo-framework');
const {
    GoogleAssistant
} = require('jovo-platform-googleassistant');
const {
    JovoDebugger
} = require('jovo-plugin-debugger');
const {
    FileDb
} = require('jovo-db-filedb');
const rp = require('request-promise');

const app = new App();

//const firebase_tools = require('firebase-tools');
const admin = require('firebase-admin');
admin.initializeApp();

app.use(
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.$session.$data.transcript = "";
        this.toIntent('InitialIntent');
    },

    InitialIntent() {
        console.log("INITIAL INTENT GOTTEN TO");
        this.followUpState('JournalLogState')
            .ask('Hi, tell me about your day.', 'Please tell me about your day.');
    },
    
    JournalLogState: {
        JournalDoneIntent() {
            this.followUpState('JournalLogState.EmotionLogState').
            ask('Overall, how would you summarize how you felt in one word?', "Please give me a one word summary of your day");
        },
        JournalLogIntent() {
            this.$session.$data.transcript = this.$session.$data.transcript + this.$inputs.log.value;
            this.followUpState('JournalLogState')
                .ask('Did you do anything else?\n' + this.$session.$data.transcript, 'What else did you do today?');
        },

        EmotionLogState: {
            EmotionLogIntent() {
                this.tell("Ok, thanks!");

                let options = {
                    method: 'GET',
                    uri: 'https://pfeifferh.lib.id/journal-service@dev/updateSession/',
                    qs: {
                        'userId': 'FFYOkVqrfebqih4m6ZyI',
                        'text': this.$session.$data.transcript,
                        'emotions': [ 0.1, 0.1, 0.1, 0.1, 0.1 ]
                    }
                };

                rp(options)
                    .then(function (repos) {
                        // Do nothing...
                    })
                    .catch(function (err) {
                        // Do nothing as well...
                    });
                /*
                this.$session.$data.summary = this.$inputs.emotion.value;
                this.tell('Alright, got it. Thanks for sharing!');

                admin.auth().verifyIdToken(user.getAccessToken())
                    .then((decodedToken) => {
                        console.log("Token decoded");
                        uid = decodedToken.uid;
                        console.log("Decode: " + uid);
                        return admin.firestore().collection('users/' + 'FFYOkVqrfebqih4m6ZyI' + '/sessions').add({
                            tokenRefreshTime: FieldValue.serverTimestamp(),
                            date: this.getTimestamp,
                            text: this.$session.$data.transcript,
                            summary: this.$session.$data.summary
                        }).then((document) => {
                            console.log("Document saved at " + 'users/' + uid + '/sessions' + document.id);
                            return 0;
                        }).catch((e) => {
                            console.log(e);
                            return e;
                        });
                        // ...
                    }).catch((error) => {
                        // Handle error
                        console.log(error);
                        return error;
                    });
                    
                admin.firestore().collection('users/' + 'FFYOkVqrfebqih4m6ZyI' + '/sessions')
                    .add({tokenRefreshTime: FieldValue.serverTimestamp(),
                        date: "Feb 3, 2019",
                        text: this.$session.$data.transcript,
                        summary: this.$session.$data.summary
                    }).then((document) => {
                        console.log("Document saved at " + 'users/' + uid + '/sessions' + document.id);
                        return 0;
                    }).catch((e) => {
                        console.log(e);
                        return e;
                    });
                    */

                // this.$inputs.emotion.value <- FOR THE INPUT

            }
        }
    }

});

module.exports.app = app;