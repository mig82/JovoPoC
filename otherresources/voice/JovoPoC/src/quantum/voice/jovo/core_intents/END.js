const kony = require('kony-node')

function END(){
	kony.log("\n******************************** END")
	// TODO: Push event to Fabric analytics.
	// TODO: Push to Fabric analytics the total duration of the session.
	this.tell("See u soon.")
}

module.exports = END
