function Private() {

	//TODO: Build this array from the list of intents available.
	let opts_array = [
		"Accounts",
		"Transfers",
		"Cards",
		"Loans",
		"Investments"
	]
	let opts_string = opts_array.slice(0, -1).join(", ") + ", or " + opts_array.slice(-1)

	//this.ask(
	this.$speech.addText(
		`Here you can choose ${opts_string}.`,
		`We're still here. Please choose ${opts_string}.` +
		`If you need help, just say "help".`
	)


	this.ask(this.$speech)
	//TODO: Add suggestions for Google Assistant.
}

module.exports = Private
