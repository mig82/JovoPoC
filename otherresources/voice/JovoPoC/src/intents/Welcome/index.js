function Welcome() {

	//TODO: Get the entity name and slogan from a config file? or as an i18n?
	let entity = "the Iron Bank of Braavos"
	let slogan = "Valar Morghulis"

	this.$speech.addText(['Hi there!', 'Hello.', 'Hello there!'])
	.addText('Welcome', this.$user.isNewUser())
	.addText('Welcome back', !this.$user.isNewUser())
	.addText(`to ${entity}.`)
	.addText(`${slogan}.`, 0.3)
	.addBreak('300ms')

	/* Seems there's no way to say "welcome" and move on to another intent,
	 * because this.tell will end the session, and this.ask will await input.
	 * So we have to just add speech here and then move on.*/
	.addText(
		`Would you like to log into your account? ` +
		`or would you prefer to browse our public services?`
	)

	this.$reprompt.addText(
		`Would you like to check your finances? `+
		`or would you prefer use out other services?`
	)

	//TODO: This is ugly as hell. Need a better way to get the router for the app.
	let router = this.$app.$data.router

	//TODO: Implement a unified toNext that can handle both intents and states.
	//return router.toNext(this)
	this.followUpState('PreLogin')
	.ask(this.$speech, this.$reprompt)
}

module.exports = Welcome
