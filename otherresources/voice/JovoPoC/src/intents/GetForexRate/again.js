"use strict"

const GetForexRateAgain = {
	START(){
		const question = `Would you like to ask for another rate?`
		this.say(question)
		this.$reprompt.addText(`Sorry, would you like to ask for another exchange rate?`)
		this.followUpState('GetForexRateAgain.AwaitDecision')
		this.ask(this.$speech)
		this.showSuggestions2(["yes", "no"], question)
	},
	AwaitDecision: {

		async YesIntent(){
			this.say(`Ok! let's go again.`)
			this.removeState()
			return await this.toStateIntent("GetForexRateSlots", "START")
		},

		async NoIntent(){
			this.say(`Ok! let's go back.`)
			this.removeState()
			//TODO: Delegate to the router where to go when the user does not want to go again.
			//this.toIntent("OfferPublicServices")
			return await this.toNext()
		}
	}
}

module.exports = GetForexRateAgain
