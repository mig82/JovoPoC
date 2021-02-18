const router = require('../router')

/**
* The LAUNCH intent is the first one your users will be directed to when they
* open your voice app without a specific question (no deep invocations, just
* "open skill" or "talk to app" on the respective platforms). If you don't have
* NEW_SESSION defined, this intent is necessary to run your voice app.
*/

function LAUNCH (){
	console.log("\n******************************** LAUNCH")
	//TODO: Push event to Fabric analytics.
	//return this.toIntent('Welcome')
	//return this.toIntent('HelloWorld')
	return router.goTo(this, "LAUNCH")
	//this.toStateIntent('PLAY_STATE', 'PlayIntent')
}
module.exports = LAUNCH
