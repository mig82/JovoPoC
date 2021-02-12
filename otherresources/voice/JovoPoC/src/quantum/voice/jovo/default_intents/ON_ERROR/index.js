function ON_ERROR () {
	console.log("ON_ERROR")
	//TODO: Push event to Fabric analytics.

	// Triggered when there is an error
	console.log(`Error: ${JSON.stringify(this.$alexaSkill.getError())}`);
	console.log(`Request: ${JSON.stringify(this.$request)}`);

	this.ask('There was an error. Can I help you in any other way?');
}

module.exports = ON_ERROR
