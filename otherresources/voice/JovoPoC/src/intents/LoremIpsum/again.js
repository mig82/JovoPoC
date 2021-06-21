"use strict"

const LoremIpsumAgain = {
	START(){
		this.$speech.addText(`Would you like to ask for more lorem ipsum?`)
		this.$reprompt.addText(`Sorry, would you like ot ask for more lorem ipsum?`)
		this.followUpState('LoremIpsumAgain.AwaitDecision')
		this.ask(this.$speech)
	},
	AwaitDecision: {

		YesIntent(){
			this.$speech.addText(`Ok! let's go again.`)
			this.removeState()
			this.toStateIntent("LoremIpsumSlots", "START")
		},

		NoIntent(){
			this.$speech.addText(`Ok! let's go back.`)
			this.removeState()
			//TODO: Delegate to the router where to go when the user does not want to go again.
			this.toIntent("OfferPublicServices")
		}
	}
}

module.exports = LoremIpsumAgain
