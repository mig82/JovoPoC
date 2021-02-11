'use strict'

//Visualizer already takes up the default port 3000.
//process.env.JOVO_PORT = 4000

const path = require("path")

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistantconv');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { kony } = require('kony-node')


// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb()
);

// Remember: Scopes for storing and accessing data.
// Request: this.$data.key = value;
// Session: this.$session.$data.key = value;
// User: this.$user.$data.key = value;
// App: this.$app.$data.key = value;

// ------------------------------------------------------------------
// Handlers
// ------------------------------------------------------------------

let handlers = {}

const $q = require("./quantum")

handlers = $q.voice.loadHandlers(path.join(__dirname, "_"))
handlers = $q.voice.loadHandlers(path.join(__dirname, "intents"), handlers)

// TODO: Load states dynamically and recursively from the ./states folder.

console.log("Handlers loaded:")
console.log(handlers)

app.setHandler(handlers)

app.setAlexaHandler({
	// LAUNCH() {
	// 	this.tell('Hello Alexa user!');
	// }
});
app.setGoogleAssistantHandler({
	// LAUNCH() {
	// 	this.tell('Hello Google user!');
	// }
});

module.exports = { app };
