"use strict"
const kony = require('kony-node')
const GetForexRateSlots = {
	START(){
		this.$speech.addText(`what currencies would you like to know the exchange rate for?`)
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
