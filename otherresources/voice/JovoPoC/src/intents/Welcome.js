"use strict"

function Welcome() {

	//TODO: Get the entity name and slogan from a config file? or as an i18n?
	let entity = ["The Iron Bank of Braavos.", "The Iron Bank."]
	let slogan = "Valar Morghulis"

	this.$speech.addText(['Hi there!', 'Hello.', 'Hello there!'])
		.addText('Welcome to', this.$user.isNewUser())
		.addText('Welcome back to', !this.$user.isNewUser())
		.addText(entity)
		.addText(` ${slogan}.`, 0.3)
		//TODO: Add a sound effect from a config file.
		//.addAudio('https://blah blah blah.mp3')
		.addBreak('500ms')

	this.tell(this.$speech)

	this.toNext()
	//this.toStateIntent('OfferLogin', 'START')
}

module.exports = Welcome
