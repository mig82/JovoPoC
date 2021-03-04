'use strict'

//Visualizer already takes up the default port 3000.
//process.env.JOVO_PORT = 4000

const {QuantumJovoApp} = require('quantum-jovo')
const app = new QuantumJovoApp("./routes.json", "intents")

app.setAlexaHandler({
	// LAUNCH() {
	// 	this.tell('Hello Alexa user!')
	// }
})
app.setGoogleAssistantHandler({
	// LAUNCH() {
	// 	this.tell('Hello Google user!')
	// }
})

module.exports = { app }
