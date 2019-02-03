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
        this.$session.$data.summary = "";
        this.$session.$data.name = "";
        // Transition to next state based on whether access token is available
        if (!this.$request.getAccessToken()) {
            this.showAccountLinkingCard();
        } else {
            this.toIntent('InitialIntent');
        }
    },
    ON_SIGN_IN() {
        if (this.$googleAction.getSignInStatus() === 'CANCELLED') {
            this.tell("User account link cancelled...");
        } else if (this.$googleAction.getSignInStatus() === 'OK') {
            let token = this.$request.getAccessToken();
            let options = {
                method: 'GET',
                uri: 'https://cheqin.auth0.com/userinfo', // You can find your URL on Client --> Settings --> 
                // Advanced Settings --> Endpoints --> OAuth User Info URL
                headers: {
                    authorization: 'Bearer ' + token,
                }
            };

            await rp(options).then((body) => {
                let data = JSON.parse(body);
                /*
                To see how the user data was stored,
                go to Auth -> Users -> Click on the user you authenticated earlier -> Raw JSON
                */
                // this.tell(data.name + ', ' + data.email);
                this.followUpState('JournalLogState')
                    .ask('Welcome back ' + data.name + ', how was your day?', 'Please tell me about your day.');
            });
        } else if (this.$googleAction.getSignInStatus() === 'ERROR') {
            this.tell("User account link failed...");
        }
    },
    InitialIntent() {
        this.followUpState('JournalLogState')
            .ask('Welcome back ' + user.getProfile().givenName + ', how was your day?', 'Please tell me about your day.');
    },
    /*
    ON_PERMISSION() {
        if (this.$googleAction.isPermissionGranted()) {
            let user = this.$googleAction.$user;
            console.log(user.getAccessToken());
            // Check, if you have the necessary permission
            if (user.hasPermission('NAME')) {
                console.log("syphilis");
                console.log(user.getProfile());
                console.log("asdf");
                this.$session.$data.name = user.getProfile().givenName;
                this.followUpState('JournalLogState')
                    .ask('Welcome back ' + user.getProfile().givenName + ', how was your day?', 'Please tell me about your day.');
            } else {
                this.followUpState('JournalLogState')
                    .tell("Something went v wrong");
            }
        } else {
            this.tell("Sorry, I can't help you bye");
        }
    },
    */

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
                //let user = this.$googleAction.$user;

                /*return admin.auth().verifyIdToken(user.getAccessToken())
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
                    });*/
                    
                    /*  TODO: (Ian) Implement this
                    return admin.firestore().collection('users/' + uid + '/sessions').add({
                        tokenRefreshTime: FieldValue.serverTimestamp(),
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