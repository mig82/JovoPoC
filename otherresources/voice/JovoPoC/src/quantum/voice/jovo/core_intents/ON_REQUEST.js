const kony = require('kony-node')

async function ON_REQUEST() {
	kony.log("\n******************************** ON_REQUEST")
	//TODO: Push event to Fabric analytics.
}

module.exports = ON_REQUEST
