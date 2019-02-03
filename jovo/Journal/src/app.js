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
const fetch = require("node-fetch");

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
            this.followUpState('EmotionLogState').
            ask('Overall, how would you summarize how you felt in one word?', "Please give me a one word summary of your day");
        },
        JournalLogIntent() {
            this.$session.$data.transcript = this.$session.$data.transcript + ' ' + this.$inputs.log.value;
            this.followUpState('JournalLogState')
                .ask('Did you do anything else?'/* + this.$session.$data.transcript*/, 'What else did you do today?');
        }

    },

    EmotionLogState: {
        EmotionLogIntent() {
            this.tell("Thanks, have a good day!");

            let emo64 = {};
            fetch('https://apiv2.indico.io/emotion', {
                method: 'POST',
                body: JSON.stringify({
                    api_key: 'e8ed0c055e13d18183a1513838645d8a',
                    data: this.$session.$data.transcript
                })
            })
            .then(r => r.json())
            .then(response => {
                console.log(response.results);
                let emojson = JSON.stringify(response.results);
                emo64 = Buffer.from(emojson).toString("base64");

                let options = {
                    method: 'GET',
                    uri: 'https://pfeifferh.lib.id/journal-service@dev/updateSession/',
                    qs: {
                        'userId': 'FFYOkVqrfebqih4m6ZyI',
                        'text': this.$session.$data.transcript,
                        'emotions': emo64
                    }
                };

                rp(options)
                    .then(function (repos) {
                        // Do nothing...
                    })
                    .catch(function (err) {
                        // Do nothing as well...
                    });
            })
            // Send a failure response to the client
            .catch(err => console.log(err));
            // this.$inputs.emotion.value <- FOR THE INPUT

        }
    }

});

module.exports.app = app;