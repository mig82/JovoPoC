"use strict"

const OpenAccountAgain = {
	START(){
		this.say(`Would you like to open another account?`)
		this.$reprompt.addText(`Sorry, would you like to open a new account?`)
		this.followUpState('OpenAccountAgain.AwaitDecision')
		this.ask(this.$speech)
	},
	AwaitDecision: {

		async YesIntent(){
			this.say(`Ok! let's go again.`)
			this.removeState()
			return await this.toStateIntent("OpenAccountSlots", "START")
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

module.exports = OpenAccountAgain
