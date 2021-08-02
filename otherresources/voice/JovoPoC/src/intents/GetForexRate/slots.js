"use strict"
//const kony = require('kony-node')
const GetForexRateSlots = {
	START(){
		const prompt = `what exchange rate would you like to know?`
		this.$speech.addText(prompt)
		this.showSuggestions2(["Euro to Dollar", "Euro to Sterling", "Dollar to Sterling"], prompt)
		this.followUpState('GetForexRateSlots.AwaitSlots')
		this.ask(this.$speech)
	},

	AwaitSlots: {
		async GetForexRateResolve(){
			this.removeState()
			await this.toIntent("GetForexRateResolve")
		},

		Unhandled(){
			this.tell("Sorry, let's try again")
			this.removeState()
			this.toIntent("GetForexRateSlots.START")
		}
	}
}

module.exports = GetForexRateSlots
