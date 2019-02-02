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
        // this.ask('Hi, tell me how your day went.', 'Please tell me how your day went.');
        this.followUpState('JournalLogState').
            ask('Welcome back, how was your day?', 'Please tell me about your day.');
    },

    JournalLogState: {
        JournalDoneIntent() {
            this.followUpState('EmotionLogState').
                ask('Overall, how would you summarize how you felt in one word?\n' + this.$inputs.log.value, "Please give me a one word summary of your day");
        },
        JournalLogIntent() {
            this.ask('Did you do anything else?', 'What else did you do today?');
        }
    },

    EmotionLogState: {
        EmotionLogIntent() {
            this.followUpState('ContinueQueryState')
                .ask('Alright, got it. Is there anything else you want to talk about?');
            // this.$inputs.emotion.value <- FOR THE INPUT
        }
    },

    ContinueQueryState: {
        AppDoneIntent() {
            this.tell("Goodnight, thanks for sharing!");
        },
        JournalLogIntent() {
            this.followUpState('JournalLogState').
                ask('Did you do anything else?', 'What else did you do today?');
        }
    }

});

module.exports.app = app;
