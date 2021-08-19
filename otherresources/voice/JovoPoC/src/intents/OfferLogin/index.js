//const kony = require('kony')

const OfferLogin = {

	async START() {

		if(await this.getAccessToken()){
			this.say(`You're already logged in.`)
			return await this.toNext()
		}
		else{
			this.$speech
				.addText(`Would you like to sign into your account? `)
				.addBreak('300ms')
				.addText(`Say no if you just want to browse our public services.`)

			this.$reprompt.addText(`Would you like to sign in?`)

			//TODO: Implement a uniform function for suggestion chips across platforms.
			this.showSuggestions2(["Yes", "No"], "Sign in?")

			this.followUpState('OfferLogin.AwaitDecision')
			this.ask(this.$speech, this.$reprompt)
		}
	},

	AwaitDecision: {
		async YesIntent() {
			//const from = this.getRoute().path

			this.$speech.addText(['Ok!', 'Great!', 'Fantastic!'])
				.addText(["Let's get you in.", "Let me open the door for you."])
				.addBreak('300ms')
			await this.toNext()
		},

		async NoIntent() {
			this.$speech.addText(['Ok!', 'No problem.'])
				.addText(["We can still help you.", "There's still lots you can do."])
				.addBreak('300ms')
			await this.toNext()
		}
	}
}

module.exports = OfferLogin
