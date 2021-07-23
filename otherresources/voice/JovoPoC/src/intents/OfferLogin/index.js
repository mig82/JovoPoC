const { QuantumJovoRouter } = require('quantum-jovo')
//const router = QuantumJovoRouter.getInstance()
const kony = require('kony-node')

const OfferLogin = {

	START() {

		this.$speech
		.addText(`Would you like to sign into your account? `)
		.addBreak('300ms')
		.addText(`Say no if you just want to browse our public services.`)

		this.$reprompt.addText(`Would you like to sign in?`)

		//TODO: Implement a uniform function for suggestion chips across platforms.
		this.showSuggestions2(["Yes", "No"], "Sign in?")

		this.followUpState('OfferLogin.AwaitDecision')
		this.ask(this.$speech, this.$reprompt)
	},

	AwaitDecision: {
		async YesIntent() {
			//const from = this.getRoute().path

			this.$speech.addText(['Ok!', 'Great!', 'Fantastic!'])
				.addText(["Let's get you in.", "Let me open the door for you."])
				.addBreak('300ms')
			//this.toIntent("Private")
			//router.toNext(this)
			await this.toNext()
		},

		async NoIntent() {
			this.$speech.addText(['Ok!', 'No problem.'])
				.addText(["We can still help you.", "There's still lots you can do."])
				.addBreak('300ms')
			//this.removeState()
			//this.toStateIntent("OfferPublicServices", "START")
			//router.toNext(this)
			await this.toNext()
		}
	}
}

module.exports = OfferLogin
