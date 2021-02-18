const routes = require('./routes.json')

console.log("\nRoutes:")
console.log(routes)
/***
* Where that is the instance of the AlexaSkill or GoogleAction from which this
* the router is called.
*/
function goTo(that, from){
	let to = routes[from]
	if(typeof to === "undefined"){
		throw new Error("No navigation route to go from :" + from)
	}
	console.debug(`Routing: '${from}' -> '${to}'`)
	return that.toIntent(to)
}

module.exports = {goTo}
