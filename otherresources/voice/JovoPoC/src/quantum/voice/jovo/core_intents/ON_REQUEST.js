const kony = require('kony-node')

const initSessionSdk = require('../initSessionSdk')

async function ON_REQUEST() {
	kony.log("\n******************************** ON_REQUEST")
	//TODO: Push event to Fabric analytics.

	await initSessionSdk(this.$session)
}

module.exports = ON_REQUEST
