'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const {
    App
} = require('jovo-framework');
const {
    Alexa
} = require('jovo-platform-alexa');
const {
    GoogleAssistant
} = require('jovo-platform-googleassistant');
const {
    JovoDebugger
} = require('jovo-plugin-debugger');
const {
    FileDb
} = require('jovo-db-filedb');

const app = new App();

const firebase_tools = require('firebase-tools');
const admin = require('firebase-admin');
admin.initializeApp();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.$data.transcript = "";
        this.$data.summary = "";
        return this.toIntent('InitialIntent');
    },

    InitialIntent() {
        this.followUpState('JournalLogState').
        ask('Welcome back, how was your day?', 'Please tell me about your day.');
    },

    JournalLogState: {
        JournalDoneIntent() {
            this.followUpState('EmotionLogState').
            ask('Overall, how would you summarize how you felt in one word?', "Please give me a one word summary of your day");
        },
        JournalLogIntent() {
            this.$data.transcript = this.$data.transcript + this.$inputs.log.value;
            this.followUpState('JournalLogState')
                .ask('Did you do anything else?\n' + this.$inputs.log.value, 'What else did you do today?');
        }
    },

    EmotionLogState: {
        EmotionLogIntent() {
            this.$data.summary = this.$inputs.emotion.value;
            this.tell('Alright, got it. Thanks for sharing!');

            var uid = "";
            console.log("WHAT");
            return admin.auth().verifyIdToken(this.$user.idToken)
                .then((decodedToken) => {
                    console.log("Token decoded");
                    uid = decodedToken.uid;
                    console.log("Decode: " + uid);
                    return admin.firestore().collection('users/' + uid + '/sessions').add({
                        tokenRefreshTime: FieldValue.serverTimestamp(),
                        date: this.getTimestamp,
                        text: this.$data.transcript,
                        summary: this.$data.summary
                    }).then((document) => {
                        console.log("Document saved at " + 'users/' + uid + '/sessions' + document.id);
                        return 0;
                    }).catch((e) =>{
                        return e;
                    });
                    // ...
                }).catch((error) => {
                    // Handle error
                    console.log(error);
                    return error;
                });
                


            // this.$inputs.emotion.value <- FOR THE INPUT
            
        }
    }

});

module.exports.app = app;