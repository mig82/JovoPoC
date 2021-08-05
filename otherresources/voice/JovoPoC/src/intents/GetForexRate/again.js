"use strict"

const GetForexRateAgain = {
	START(){
		this.say(`Would you like to ask for another rate?`)
		this.$reprompt.addText(`Sorry, would you like ot ask for another exchange rate?`)
		this.followUpState('GetForexRateAgain.AwaitDecision')
		this.ask(this.$speech)
	},
	AwaitDecision: {

		YesIntent(){
			this.say(`Ok! let's go again.`)
			this.removeState()
			this.toStateIntent("GetForexRateSlots", "START")
		},

		NoIntent(){
			this.say(`Ok! let's go back.`)
			this.removeState()
			//TODO: Delegate to the router where to go when the user does not want to go again.
			this.toIntent("OfferPublicServices")
		}
	}
}

module.exports = GetForexRateAgain
