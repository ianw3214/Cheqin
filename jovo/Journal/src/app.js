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
        this.$session.$data.summary = "";
        this.toIntent('InitialIntent');
            
        //
    },
    InitialIntent() {
        //.
        let user = this.$googleAction.$user;
        console.log("ID: " + user.getId());
        if (this.googleAction.$request.getAccessToken()) {
            console.log("YOU HAVE A TOKEN!!!!");
            this.followUpState('JournalLogState')
                .ask('Welcome back, how was your day?', 'Please tell me about your day.');

        } else {
            console.log("NO TOKEN");
            this.$googleAction.askForName("");
        }

        //
    },
    ON_PERMISSION() {
        console.log("POOP");
        if (this.$googleAction.isPermissionGranted()) {
            console.log("BULLSHIT");
            let user = this.$googleAction.$user;
            console.log("HELP");
            console.log(user);
            console.log(user.getAccessToken());
            console.log("HMMMM");
            // Check, if you have the necessary permission
            if (user.hasPermission('NAME')) {
                console.log("syphilis");
                console.log(user.getProfile());
                console.log("asdf");
                this.followUpState('JournalLogState')
                    .ask('Welcome back ' + user.getProfile().givenName + ', how was your day?', 'Please tell me about your day.');
                /* 
                  user.profile.givenName
                  user.profile.familyName
                  user.profile.displayName
                */
            } else {
                this.followUpState('JournalLogState')
                    .tell("Something went v wrong");
            }
        } else {
            this.tell("Sorry, I can't help you bye");
        }
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
                this.$session.$data.summary = this.$inputs.emotion.value;
                this.tell('Alright, got it. Thanks for sharing!');

                /*
                var uid = "";
                console.log("idToken " + this.$user.idToken);
                console.log("session raw" + this.$request.session)
                console.log("session keys" + Object.keys(this.$request.session))
                console.log("session stringify" + JSON.stringify(this.$user))
                console.log("user raw" + this.$user);
                console.log("user keys " + Object.keys(this.$user));
                console.log("user stringify" + JSON.stringify(this.$user));
                console.log("access tokan" + this.$request.getAccessToken());
                */
                let user = this.$googleAction.$user;

                return admin.auth().verifyIdToken(user.getAccessToken())
                    .then((decodedToken) => {
                        console.log("Token decoded");
                        uid = decodedToken.uid;
                        console.log("Decode: " + uid);
                        return admin.firestore().collection('users/' + uid + '/sessions').add({
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



                // this.$inputs.emotion.value <- FOR THE INPUT

            }
        }
    }

});

module.exports.app = app;