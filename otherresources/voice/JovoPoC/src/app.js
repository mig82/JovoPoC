'use strict'

//Visualizer already takes up the default port 3000.
//process.env.JOVO_PORT = 4000

const {QuantumJovoApp} = require('quantum-jovo')
const app = new QuantumJovoApp("./routes.json", "./intents")

module.exports = { app }
