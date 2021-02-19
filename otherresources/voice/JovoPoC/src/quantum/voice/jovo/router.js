const path = require('path')

const findDirByCallerName = require("../../util/findDirByCallerName")
const kony = require('kony-node')

var initialised = false
var defaultRoutesFile = './routes.json'
var routes = {}

function init(routesFile){
	if(!initialised){
		let appRootPath = findDirByCallerName("app.js")
		let routesPath = path.join(appRootPath, routesFile || defaultRoutesFile)
		kony.log("\nRoutes path: " + routesPath)

		routes = require(routesPath)
		kony.log(`Routes: ${JSON.stringify(routes, null, 4)}\n\n`)
		initialised = true
	}
}

/***
* Where that is the instance of the AlexaSkill or GoogleAction from which this
* the router is called.
*/
function goTo(that, from){

	let to = routes[from]
	if(typeof to === "undefined"){
		throw new Error("No navigation route to go from :" + from)
	}
	kony.debug(`Routing: '${from}' -> '${to}'`)
	return that.toIntent(to)
}

module.exports = {
	init,
	goTo
}
