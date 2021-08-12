"use strict"

const kony = require("kony-node")

module.exports = {

	async START(){
		kony.debug("*************** AreYouACustomer.START")

		this.followUpState('AreYouACustomer.AwaitResponse') //Note this will fail because this state is not defined.
		const question = `Are you already a customer?`
		this.prompt(question)
		this.showSuggestions2(["yes", "no"], question) 
	},

	AwaitResponse: {

		async YesIntent(){
			this.say(`Great!`)
			this.say([
				"You should sign in first then.",
				"Then you should log in first."
			])
			this.removeState()
			return await this.toIntent('OfferLogin.START')
		},

		async NoIntent(){
			this.say(`Ok. Then let's get you on board first.`)
			this.removeState()
			return await this.toIntent('OnboardCustomerStart')
		}
	}
}
