const kony = require('kony-node')

function Unhandled() {
	kony.warn("\n******************************** Unhandled")
	//TODO: Push event to Fabric analytics.
	this.tell("I'm afraid I don't know how to do that yet.")
	//return this.toIntent('LAUNCH');
}

module.exports = Unhandled
