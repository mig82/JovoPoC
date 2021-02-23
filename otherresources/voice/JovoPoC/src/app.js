'use strict'

//Visualizer already takes up the default port 3000.
//process.env.JOVO_PORT = 4000

const path = require("path")
const {QuantumJovoApp} = require('./quantum/voice/jovo')

const handlersPath = path.join(__dirname, "intents")
const app = new QuantumJovoApp(handlersPath)

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
