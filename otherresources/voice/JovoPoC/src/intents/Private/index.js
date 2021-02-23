function Private() {

	//TODO: Build this array from the list of intents available.
	let intents = [
		"Accounts",
		"Transfers",
		"Cards",
		"Loans",
		"Investments"
	]
	let options = intents.slice(0, -1).join(", ") + " or " + intents.slice(-1)

	//this.ask(
	this.$speech.addText(
		`Here you can choose ${options}.`,
		`We're still here. Please choose ${options}.` +
		`If you need help, just say "help".`
	)


	this.ask(this.$speech)
	//TODO: Add suggestions for Google Assistant.
}

module.exports = Private
