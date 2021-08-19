"use strict"

const kony = require('kony')

async function OfferAccountServices() {
	kony.debug("******************* OfferAccountServices")

	//TODO: Implement something like this.getPublicSkills and this.getPrivateSkills, to build this array dynamically.
	let opts_array = [
		"open a new account",
		"query accounts",
		"manage your finances"
	]
	let opts_string = this.sayOptions(opts_array)

	this.showSuggestions2(opts_array, "What would you like to do?")

	this.$speech.addText(
		`What would you like to do? You can ${opts_string}.`,
		`Please choose ${opts_string}.` +
		`If you need help, just say "help".`
	)

	this.ask(this.$speech)
}

module.exports = OfferAccountServices

