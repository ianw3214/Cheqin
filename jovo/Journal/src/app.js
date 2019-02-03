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
        //.
        this.$googleAction.askForName("");
        //
    },
    ON_PERMISSION() {
        if (this.$googleAction.isPermissionGranted()) {
            let user = this.$googleAction.$request.getUser();

            // Check, if you have the necessary permission
            if (user.permissions.indexOf('NAME') > -1) {
                this.followUpState('JournalLogState')
                console.log(user.profile);
                return ask('Welcome back' + user.profile.givenName + ', how was your day?', 'Please tell me about your day.');
                /* 
                  user.profile.givenName
                  user.profile.familyName
                  user.profile.displayName
                */
            }
        } else {
            return tell("Sorry, I can't help you bye");
        }
    },

    JournalLogState: {
        JournalDoneIntent() {
            this.followUpState('JournalLogState.EmotionLogState').
            ask('Overall, how would you summarize how you felt in one word?', "Please give me a one word summary of your day");
        },
        JournalLogIntent() {
            this.$data.transcript = this.$data.transcript + this.$inputs.log.value;
            this.followUpState('JournalLogState')
                .ask('Did you do anything else?\n' + this.$inputs.log.value, 'What else did you do today?');
        },

        EmotionLogState: {
            EmotionLogIntent() {
                this.$data.summary = this.$inputs.emotion.value;
                this.tell('Alright, got it. Thanks for sharing!');

                var uid = "";
                console.log("idToken " + this.$user.idToken);
                console.log("session raw" + this.$request.session)
                console.log("session keys" + Object.keys(this.$request.session))
                console.log("session stringify" + JSON.stringify(this.$user))
                console.log("user raw" + this.$user);
                console.log("user keys " + Object.keys(this.$user));
                console.log("user stringify" + JSON.stringify(this.$user));
                console.log("access tokan" + this.$request.getAccessToken());

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



                // this.$inputs.emotion.value <- FOR THE INPUT

            }
        }
    }

});

module.exports.app = app;