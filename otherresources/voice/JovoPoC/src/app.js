'use strict';

//Visualizer already takes up the default port 3000.
//process.env.JOVO_PORT = 4000

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
// TODO: Load handlers dynamically from the ./intents folder.
// TODO: Load states dynamically and recursively from the ./states folder.

// Core handlers
// const LAUNCH = require("./_/LAUNCH")
// const Unhandled = require("./_/Unhandled")
// const END = require("./_/END")

const handlers = {}

// Core handlers
let coreHadler = ["LAUNCH", "END", "Unhandled"]
coreHadler.forEach((name) => {
	let handler = require(`./_/${name}`)
	handlers[name] = handler
})

// App handlers
let appHandlers = ["Welcome", "HelloWorld", "MyNameIs", "Play"]
appHandlers.forEach((name) => {
	let handler = require(`./intents/${name}`)
	handlers[name] = handler
})

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
