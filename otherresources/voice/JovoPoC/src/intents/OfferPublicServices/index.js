const kony = require('kony-node')

function OfferPublicServices() {

	//TODO: Build this array from the list of intents available.
	let opts_array = [
		"exchange rates",
		"financial news",
		"locate ATM's"
	]
	let opts_string = opts_array.slice(0, -1).join(", ") + ", or " + opts_array.slice(-1)

	//this.ask(
	this.$speech.addText(
		`You can ask about ${opts_string}.`,
		`We're still here. Please choose ${opts_string}.` +
		`If you need help, just say "help".`
	)

	if(this.isGoogleAction()){
		this.$googleAction.showSuggestions(opts_array)
	}

	this.ask(this.$speech)
}


module.exports = OfferPublicServices
