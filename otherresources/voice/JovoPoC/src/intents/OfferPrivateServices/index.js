"use strict"

const kony = require('kony')

async function OfferPrivateServices() {
	kony.debug("******************* OfferPrivateServices")

	//TODO: Implement something like this.getPublicSkills and this.getPrivateSkills, to build this array dynamically.
	let opts_array = [
		"Accounts",
		"Transfers",
		"Cards",
		"Loans",
		"Investments"
	]
	let opts_string = this.sayOptions(opts_array)

	this.showSuggestions2(opts_array, "What would you like to do?")

	this.$speech.addText(
		`What would you like to do? You can ask about ${opts_string}.`,
		`Please choose ${opts_string}.` +
		`If you need help, just say "help".`
	)

	this.ask(this.$speech)
}

module.exports = OfferPrivateServices
