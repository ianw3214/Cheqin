'use strict';

const { Webhook } = require('jovo-framework');

const { Interface } = require('../interface/interface.js');

exports.handler = async (context) => {
    response = {};
    await app.handle(new Interface(context.params, response));
    return {
        body: response
    };
};