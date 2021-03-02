"use strict"

const GetForexRateSlots = {
	START(){
		this.$speech.addText(`what currencies would you like to know the exchange rate for?`)
		this.followUpState('GetForexRateSlots.AwaitSlots')
		this.ask(this.$speech)
	},

	AwaitSlots: {
		async GetForexRate(){
			this.removeState()
			await this.toIntent("GetForexRate")
		},

		Unhandled(){
			this.tell("Sorry, let's try again")
			this.removeState()
			this.toIntent("GetForexRateSlots")
		}
	}
}

module.exports = GetForexRateSlots
