"use strict"

const kony = require('kony-node')
const router = require('quantum-jovo').QuantumJovoRouter.getInstance()

function OfferPrivateServices() {

	//TODO: The router is the one that should know when an intent requires authentication.
	if (!this.$request.getAccessToken()){
		kony.debug("The user is not logged in")
		this.$speech.addText("Hmmm... It seems you've not linked your account yet.")
		router.toNext(this)
	}

	else{
		//TODO: Build this array from the list of intents available.
		let opts_array = [
			"Accounts",
			"Transfers",
			"Cards",
			"Loans",
			"Investments"
		]
		let opts_string = opts_array.slice(0, -1).join(", ") + ", or " + opts_array.slice(-1)

		if(this.isGoogleAction()){
			this.$googleAction.showSuggestions(opts_array)
		}

		this.$speech.addText(
			`Here you can choose ${opts_string}.`,
			`We're still here. Please choose ${opts_string}.` +
			`If you need help, just say "help".`
		)

		this.ask(this.$speech)
	}
}

module.exports = OfferPrivateServices
