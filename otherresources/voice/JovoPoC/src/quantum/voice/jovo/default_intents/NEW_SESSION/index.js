const attachSdkToSession = require('./attachSdkToSession')


/**
 * You can use the NEW_SESSION intent instead of the LAUNCH intent if you want
 * to always map new session requests to one intent. This means that any request,
 * even deep invocations, will be mapped to the NEW_SESSION intent. Either LAUNCH
 * or NEW_SESSION are required.
 */
async function NEW_SESSION(){
	console.log("******************************** NEW_SESSION")
	// TODO: Push event to Fabric analytics.

	await attachSdkToSession(this.$session)

}
module.exports = NEW_SESSION
