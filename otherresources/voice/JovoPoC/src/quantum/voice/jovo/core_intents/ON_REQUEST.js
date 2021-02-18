const initSessionSdk = require('../initSessionSdk')

async function ON_REQUEST() {
	console.log("\n******************************** ON_REQUEST")
	//TODO: Push event to Fabric analytics.

	await initSessionSdk(this.$session)
}

module.exports = ON_REQUEST
