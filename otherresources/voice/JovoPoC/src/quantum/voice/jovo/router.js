const path = require('path')

const getAppRoot = require("../../util/getAppRoot")
const kony = require('kony-node')

var initialised = false
var defaultRoutesFile = './routes.json'
var routes = {}

function init(routesFile){
	if(!initialised){
		let appRootPath = getAppRoot()
		let routesPath = path.join(appRootPath, routesFile || defaultRoutesFile)
		kony.log("\nRoutes path: " + routesPath)

		routes = require(routesPath)
		kony.log(`Routes: ${JSON.stringify(routes, null, 4)}\n\n`)
		initialised = true
	}
}

/**
 * goToNext - Go to the next intent from the current one, based on the router's
 * configured routes.
 *
 * @param  {fromIntent} The intent that calls the router —i.e. the AlexaSkill or GoogleAction.
 * @return {Intent}      The intent to redirect to.
 */
function toNextIntent(fromIntent){

	let from = fromIntent.getRoute().path

	let to = routes[from]// || routes[mapped]
	if(typeof to === "undefined"){
		throw new Error("No navigation route to go from:" + from)
	}
	kony.debug(`Routing: '${from}' -> '${to}'`)
	return fromIntent.toIntent(to)
}


/**
 * goTo - Go to a specific intent.
 *
 * @param  {fromIntent} The intent that calls the router —i.e. the AlexaSkill or GoogleAction.
 * @param  {to} The name of the intent to redirect to.
 * @return {Intent}      The intent to redirect to.
 */
function toIntent(fromIntent, to){

	if(typeof to === "undefined"){
		throw new Error("Cannot redirect to undefined")
	}
	kony.debug(`Routing: -> '${to}'`)
	return fromIntent.toIntent(to)
}

module.exports = {
	init,
	toNextIntent,
	toIntent
}
