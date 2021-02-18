const DEFAULT_INTENTS_FOLDER = "default_intents"

const path = require("path")

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistantconv');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const requireFolder = require('../../util/requireFolder')

const NEW_SESSION = require("./core_intents/NEW_SESSION")
const LAUNCH = require("./core_intents/LAUNCH")
const NEW_USER = require("./core_intents/NEW_USER")
const ON_REQUEST = require("./core_intents/ON_REQUEST")
const ON_ERROR = require("./core_intents/ON_ERROR")
const Unhandled = require("./core_intents/Unhandled")
const END = require("./core_intents/END")
const onResponse = require('./onResponse') //Note this is not an event hander. Just a function.

const createApp = (appHandlersPath) => {

	console.log("__dirname: "+ appHandlersPath)

	const app = new App()
	app.use(
		new Alexa(),
		new GoogleAssistant(),
		new JovoDebugger(),
		new FileDb()
	)

	// const handlers = requireFolder(path.join(__dirname, DEFAULT_INTENTS_FOLDER))
	// console.log("\nCore handlers loaded:")
	// console.log(handlers)

	const appHandlers = requireFolder(appHandlersPath)
	console.log("\nApp handlers loaded:")
	console.log(appHandlers)

	const coreHandlers = {
		NEW_SESSION,
		LAUNCH,
		NEW_USER,
		ON_REQUEST,
		ON_ERROR,
		Unhandled,
		END
	}
	//TODO: If the app tries to override any of the core handlers, wrap the app's definition in the core one.
	console.log("\nCore handlers loaded:")
	console.log(coreHandlers)

	app.setHandler({...appHandlers, ...coreHandlers})
	app.onResponse(onResponse)

	/*
		Remember: Scopes for storing and accessing data.
		Request: this.$data.key = value;
		Session: this.$session.$data.key = value;
		User: this.$user.$data.key = value;
		App: this.$app.$data.key = value;
	*/

	return app
}
module.exports = { createApp }
