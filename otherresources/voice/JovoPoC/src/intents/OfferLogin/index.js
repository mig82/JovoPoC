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
		if(this.isAlexaSkill()){
			//TODO: Is there anything equivalent to suggetion chips for Alexa?
			this.$alexaSkill.showStandardCard(
				`Sign into Iron Bank?`,
				'Say yes or no.',
				{
					smallImageUrl: 'https://via.placeholder.com/720x480',
					largeImageUrl: 'https://via.placeholder.com/1200x800',
				}
			)
		}
		else if(this.isGoogleAction()){
			this.$googleAction.showSuggestions(["yes", "no"])
		}
		else if(typeof this.$webApp !== "undefined"){
			this.$webApp?.showQuickReplies(['Yes', 'No'])
		}

		this.followUpState('OfferLogin.AwaitDecision')
		this.ask(this.$speech, this.$reprompt)
	},

	AwaitDecision: {
		YesIntent() {
			const from = this.getRoute().path

			this.$speech.addText(['Ok!', 'Great!', 'Fantastic!'])
			.addText(["Let's get you in.", "Let me open the door for you."])
			.addBreak('300ms')
			//this.toIntent("Private")
			//router.toNext(this)
			this.toNext()
		},

		NoIntent() {
			this.$speech.addText(['Ok!', 'No problem.'])
			.addText(["We can still help you.", "There's still lots you can do."])
			.addBreak('300ms')
			//this.removeState()
			//this.toStateIntent("OfferPublicServices", "START")
			//router.toNext(this)
			this.toNext()
		}
	}
}

module.exports = OfferLogin
