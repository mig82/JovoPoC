'use strict';

/*global process */

const { ExpressJS, Lambda, Webhook } = require('jovo-framework');
const { app } = require('./app.js');
const cors = require('cors')
const kony = require('kony-node')

// ------------------------------------------------------------------
// HOST CONFIGURATION
// ------------------------------------------------------------------

// ExpressJS (Jovo Webhook)
if (process.argv.indexOf('--webhook') > -1) {
  const port = process.env.JOVO_PORT || 3000;
  Webhook.jovoApp = app;

  // Accept CORS and work locally with JovoWebClient lib.
  Webhook.use(cors())

  Webhook.listen(port, () => {
    kony.info(`Local server listening on port ${port}.`);
  });

  Webhook.post('/webhook', async (req, res) => {

    try{
      await app.handle(new ExpressJS(req, res));
    }
    catch(e){
      console.error(e)
      this.setSessionAttribute("error", e)
    }
  });
}

// AWS Lambda
exports.handler = async (event, context, callback) => {
  await app.handle(new Lambda(event, context, callback));
};
