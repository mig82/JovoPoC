const kony = require('kony-node')

/**
 * You can use the NEW_SESSION intent instead of the LAUNCH intent if you want
 * to always map new session requests to one intent. This means that any request,
 * even deep invocations, will be mapped to the NEW_SESSION intent. Either LAUNCH
 * or NEW_SESSION are required.
 */
async function NEW_SESSION(){
	kony.log("******************************** NEW_SESSION")
	// TODO: Push event to Fabric analytics.
}
module.exports = NEW_SESSION
