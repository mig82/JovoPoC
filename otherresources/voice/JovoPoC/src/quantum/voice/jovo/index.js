"use strict"

const DEFAULT_HANDLERS_FOLDER = "handlers"

const path = require("path")
const kony = require('kony-node')

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistantconv');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const NEW_SESSION = require("./core_intents/NEW_SESSION")
const LAUNCH = require("./core_intents/LAUNCH")
const NEW_USER = require("./core_intents/NEW_USER")
const ON_REQUEST = require("./core_intents/ON_REQUEST")
const ON_ERROR = require("./core_intents/ON_ERROR")
const Unhandled = require("./core_intents/Unhandled")
const END = require("./core_intents/END")
const onResponse = require('./onResponse') //Note this is not an event hander. Just a function.

const router = require("./router")
const initSdk = require("./initSdk")
const getSdk = require("./getSdk")

const requireFolder = require('../../util/requireFolder')
const getAppRoot = require('../../util/getAppRoot')

class QuantumJovoApp extends App {
	constructor(handlersDir){

		super()

		const app = this
		app.use(
			new Alexa(),
			new GoogleAssistant(),
			new JovoDebugger(),
			new FileDb()
		)

		app._initRouter()

		const appHandlers = app._loadHandlers(handlersDir)
		kony.info("\nApp handlers loaded:")
		kony.info(appHandlers)

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
		kony.info("\nCore handlers loaded:")
		kony.info(coreHandlers)

		app.setHandler({...appHandlers, ...coreHandlers})
		app.onResponse(onResponse)

		/*
			Remember: Scopes for storing and accessing data.
			Request: this.$data.key = value;
			Session: this.$session.$data.key = value;
			User: this.$user.$data.key = value;
			App: this.$app.$data.key = value;
		*/

		// initSdk is async, but it's ok to call it without await because it
		// happens way before any handler will ever need it*/
		app.initSdk()
		return app
	}

	_initRouter(){
		router.init()
		this.$data.router = router
	}

	_loadHandlers(handlersDir){
		const appRootPath = getAppRoot()
		const handlersAbsPath = path.join(appRootPath, handlersDir || DEFAULT_HANDLERS_FOLDER)
		const appHandlers = requireFolder(handlersAbsPath)
		return appHandlers
	}

	initSdk(){
		return initSdk.apply(this, arguments)
	}

	getSdk(){
		return getSdk.apply(this, arguments)
	}
}

module.exports = { QuantumJovoApp }
