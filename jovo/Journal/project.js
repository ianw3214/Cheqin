// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
       nlu: 'alexa',
    },
    googleAction: {
      nlu: 'dialogflow',
      dialogflow: {
        projectId: 'journalagent-db480',
        keyFile: 'journalagent-db480-7006764868ba.json'
      }
    },
    endpoint: '${JOVO_WEBHOOK_URL}',
};
 