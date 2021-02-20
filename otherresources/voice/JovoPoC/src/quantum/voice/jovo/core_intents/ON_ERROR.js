const kony = require('kony-node')

// Triggered when there is an error
function ON_ERROR () {
	kony.error("\n******************************** ON_ERROR")
	//TODO: Push event to Fabric analytics.

	if(this.isAlexaSkill()){
		kony.error(`Error: ${JSON.stringify(this.$alexaSkill.getError())}`);
	}

	kony.error(`Request: ${JSON.stringify(this.$request)}`);

	this.ask('There was an error. Would you like to start over?');
}

module.exports = ON_ERROR
