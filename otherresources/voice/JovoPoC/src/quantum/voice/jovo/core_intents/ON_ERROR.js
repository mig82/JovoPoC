const kony = require('kony-node')

function ON_ERROR () {
	kony.error("\n******************************** ON_ERROR")
	//TODO: Push event to Fabric analytics.

	// Triggered when there is an error
	kony.error(`Error: ${JSON.stringify(this.$alexaSkill.getError())}`);
	kony.error(`Request: ${JSON.stringify(this.$request)}`);

	this.ask('There was an error. Can I help you in any other way?');
}

module.exports = ON_ERROR
