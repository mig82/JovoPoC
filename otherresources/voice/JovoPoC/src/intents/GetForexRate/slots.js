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
		//Euro to Sterling, Euro to Dollar, Dollar to Yen, etc.
		async GetForexRateResolve(){

			if(this.includesInputs(["ccyFrom", "ccyTo"])){
				this.removeState()
				return await this.toIntent("GetForexRateResolve")
			}
			else {
				if(this.includesInputs(["ccyFrom"])){
					this.say(`Sorry, I only got you want an exchange rate ` +
					`based on ${this.ssml.spellOut(this.$inputs.ccyFrom.key)}, ` +
					`but I didn't understand to what. Let's try again.`)
				}
				else if(this.includesInputs(["ccyTo"])){
					this.say(`Sorry, I only got you want an exchange rate ` +
					`to ${this.ssml.spellOut(this.$inputs.ccyTo.key)}, ` +
					`but I didn't understand based on what. Let's try again.`)
				}
				else {
					this.say(`Sorry, I didn't get any of that. Let's try again.`)
				}
				this.removeState()
				this.toIntent("GetForexRateSlots.START")
			}
		},

		Unhandled(){
			this.tell("Sorry, I didn't get that. Let's try again")
			this.removeState()
			this.toIntent("GetForexRateSlots.START")
		}
	}
}

module.exports = GetForexRateSlots
