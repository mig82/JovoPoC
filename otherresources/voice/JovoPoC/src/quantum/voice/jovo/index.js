const DEFAULT_INTENTS_FOLDER = "default_intents"

const path = require("path")

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistantconv');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { kony } = require('kony-node')

const requireFolder = require('../../util/requireFolder')

const createApp = (appHandlersPath) => {

	const app = new App()
	app.use(
		new Alexa(),
		new GoogleAssistant(),
		new JovoDebugger(),
		new FileDb()
	)

	const handlers = requireFolder(path.join(__dirname, DEFAULT_INTENTS_FOLDER))
	console.log("\nCore handlers loaded:")
	console.log(handlers)

	const appHandlers = requireFolder(appHandlersPath)
	console.log("\nApp handlers loaded:")
	console.log(appHandlers)

	// TODO: Should we allow for the inbuilt handlers to be overridden?
	//Check if any of the app handlers overrides a default handler.
	for (const key in appHandlers) {
		//Warn if the app handler has the same name as an existing built-in handler...
		if(appHandlers.hasOwnProperty(key) && typeof handlers[key] !== "undefined"){
			let defaultHandler = handlers[key]
			let handlerOverride = appHandlers[key]
			console.warn(`\nWARN: App handler '${key}' overrides default handler by the same name with\n${handlerOverride}\n`)
		}
	}
	app.setHandler({...handlers, ...appHandlers})

	/*
	Remember: Scopes for storing and accessing data.
	Request: this.$data.key = value;
	Session: this.$session.$data.key = value;
	User: this.$user.$data.key = value;
	App: this.$app.$data.key = value;
	*/

	//initSdk()

	return app
}
module.exports = { createApp }
