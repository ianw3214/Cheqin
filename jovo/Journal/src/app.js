'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

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
            this.followUpState('JournalLogState')
                .ask('Did you do anything else?\n' + this.$inputs.log.value, 'What else did you do today?');
        }
    },

    EmotionLogState: {
        EmotionLogIntent() {
            this.tell('Alright, got it. Thanks for sharing!');
            // this.$inputs.emotion.value <- FOR THE INPUT
        }
    }

});

module.exports.app = app;
