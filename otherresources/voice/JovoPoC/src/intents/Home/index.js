function Home() {

	//TODO: Build this array from the list of intents available.
	let intents = [
		"exchange rates",
		"financial news",
		"locate ATM's"
	]
	let options = intents.slice(0, -1).join(", ") + " or " + intents.slice(-1)

	//this.ask(
	this.$speech.addText(
		`Would you like to know about ${options}.`,
		`We're still here. Please choose ${options}.` +
		`If you need help, just say "help".`
	)

	this.ask(this.$speech)
	//TODO: Add suggestions for Google Assistant.
}

module.exports = Home
