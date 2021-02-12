Unhandled() {
	this.$speech.addText("Would you like to do Foo.")
	this.$reprompt.addText("Please answer whether you'd like to Foo.")
	this.ask(this.$speech, this.$reprompt)
}
module.exports = Unhandled
