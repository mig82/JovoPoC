"use strict"

const GetForexRateAgain = {
	START(){
		this.$speech.addText(`Would you like to ask for another rate?`)
		this.$reprompt.addText(`Sorry, would you like ot ask for another exchange rate?`)
		this.followUpState('GetForexRateAgain.AwaitDecision')
		this.ask(this.$speech)
	},
	AwaitDecision: {

		YesIntent(){
			this.$speech.addText(`Ok! let's go again.`)
			this.removeState()
			this.toStateIntent("GetForexRateSlots", "START")
		},

		NoIntent(){
			this.$speech.addText(`Ok! let's go back.`)
			this.removeState()
			//TODO: Delegate to the router where to go when the user does not want to go again.
			this.toStateIntent("OfferPublicServices", "START")
		}
	}
}

module.exports = GetForexRateAgain
