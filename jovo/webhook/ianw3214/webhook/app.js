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
            ask('Hi, what did you do today?.', 'Please tell me what happened today.');
    },

    JournalLogState: {
        JournalLogIntent() {
            this.followUpState('EmotionLogState').
                ask('How was your day overall?\n' + this.$inputs.log.value, "Please tell me how your day went");
        }
    },

    EmotionLogState: {
        EmotionLogIntent() {
            this.tell('Your day was ' + this.$inputs.emotion.value);
        }
    }

});

module.exports.app = app;
