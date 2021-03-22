const { QuantumJovoRouter } = require('quantum-jovo')
const router = QuantumJovoRouter.getInstance()

function Welcome() {

	//TODO: Get the entity name and slogan from a config file? or as an i18n?
	let entity = ["The Iron Bank of Braavos", "The Iron Bank"]
	let slogan = "Valar Morghulis"

	this.$speech.addText(['Hi there!', 'Hello.', 'Hello there!'])
	.addText('Welcome to', this.$user.isNewUser())
	.addText('Welcome back to', !this.$user.isNewUser())
	.addText(entity)
	.addText(`.`)
	.addText(` ${slogan}.`, 0.3)
	//TODO: Add a sound effect from a config file.
	//.addAudio('https://blah blah blah.mp3')
	.addBreak('500ms')

	this.tell(this.$speech)

	//TODO: Implement a unified router with a toNext function that can handle both intents and states.
	router.toNext(this)
	//this.toStateIntent('OfferLogin', 'START')
}

module.exports = Welcome
