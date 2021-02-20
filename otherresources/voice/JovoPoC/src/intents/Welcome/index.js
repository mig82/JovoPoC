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
	//TODO: This is ugly as hell. Need a better way to get the router for the app.
	let router = this.$app.$data.router
	return router.toNextIntent(this)
}

module.exports = Welcome
