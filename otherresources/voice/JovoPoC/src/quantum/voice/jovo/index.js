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

	/*
	Remember: Scopes for storing and accessing data.
	Request: this.$data.key = value;
	Session: this.$session.$data.key = value;
	User: this.$user.$data.key = value;
	App: this.$app.$data.key = value;
	*/

	const handlers = requireFolder(path.join(__dirname, DEFAULT_INTENTS_FOLDER))
	console.log("\nCore handlers loaded:")
	console.log(handlers)

	const appHandlers = requireFolder(appHandlersPath)
	console.log("\nApp handlers loaded:")
	console.log(appHandlers)

	/* TODO: Rather than just merge the two sets of handlers, it would be better
	 * to merge one by one. So that if the app defines its own ON_ERROR, we
	 * call both. */
	app.setHandler({...handlers, ...appHandlers})

	return app
}
module.exports = { createApp }
