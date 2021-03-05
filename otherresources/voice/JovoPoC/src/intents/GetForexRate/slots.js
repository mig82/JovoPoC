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
			kony.warn("Forwarding to global GetForexRateResolve")
			await this.toIntent("GetForexRateResolve")
		},

		Unhandled(){
			this.tell("Sorry, let's try again")
			this.removeState()
			this.toIntent("GetForexRateSlots")
		}
	}
}

module.exports = GetForexRateSlots
