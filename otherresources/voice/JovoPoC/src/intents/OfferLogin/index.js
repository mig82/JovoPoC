const OfferLogin = {

	main() {
		this.$speech
		.addText(`Would you like to log into your account? `)
		.addBreak('300ms')
		.addText(`Say no if you just want to browse our public services.`)

		this.$reprompt.addText(`Would you like to log in?`)

		if(this.isAlexaSkill()){
			//TODO: Is there anything equivalent to suggetion chips for Alexa?
		}
		else if(this.isGoogleAction()){
			kony.debug(this.$googleAction.constructor.name)
			this.$googleAction.showSuggestions(["yes", "no"])
		}

		this.followUpState('OfferLogin.AwaitLoginDecision')
		this.ask(this.$speech, this.$reprompt)
	},

	AwaitLoginDecision: {
		YesIntent() {
			this.$speech.addText(['Ok!', 'Great!', 'Fantastic!'])
			.addText(["Let's get you in.", "Let me open the door for you."])

			this.removeState()
			this.toIntent("Private")
		},

		NoIntent() {
			this.$speech.addText(['Ok!', 'No problem.'])
			.addText(["We can still help you.", "There's still lots you can do."])

			this.removeState()
			this.toIntent("OfferPublicServices.main")
		}
	}
}

module.exports = OfferLogin
