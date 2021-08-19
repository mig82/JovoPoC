"use strict"

const kony = require('kony')

const GetForexRateSlots = {
	START(){
		kony.debug("*************** GetForexRateSlots.START")
		
		this.setSlots([
			{ id: "ccyFrom", prompt: "What currency would you like to conver from?", suggestions: [ "Euro", "US Dollar", "British Pound", "Japanese Yen"] },
			{ id: "ccyTo", prompt: "What currency would you like to convert to?", suggestions: [ "Euro", "US Dollar", "British Pound", "Swiss Franc" ] }
		])
		//return this.toIntent("GetForexRateSlots.prompt")

		this.followUpState('GetForexRateSlots.AwaitSlots')
		const question = `what exchange rate would you like to know?`
		this.showSuggestions2(["euro to dollar", "euro to sterling", "dollar to sterling"], question)
		this.ask(question)
	},

	async prompt(){
	
		kony.debug("*************** GetForexRateSlots.prompt")
		this.followUpState('GetForexRateSlots.AwaitSlots')
		const nextSlot = this.getNextSlot()
		//this.setSessionAttribute("awaited_slot", nextSlot.id)

		if(nextSlot){
			this.showSuggestions2(nextSlot.suggestions, nextSlot.prompt)
			//this.prompt(nextSlot.prompt)
			this.$speech.addText(nextSlot.prompt)
			this.ask(this.$speech)
		}
		else{
			this.removeState()
			return await this.toIntent("GetForexRateResolve")
		}
	},

	AwaitSlots: {
		//Euro to Sterling, Euro to Dollar, Dollar to Yen, etc.
		async GetForexRateResolve(){

			kony.debug("*************** GetForexRateSlots.AwaitSlots.GetForexRateResolve")
			kony.warn(JSON.stringify(this.$inputs))

			if(this.includesInputs(["ccyFrom", "ccyTo"])){
				this.removeState()
				return await this.toIntent("GetForexRateResolve")
			}
			else {
				//If we have the from, we're missing the to
				if(this.getInputValue("ccyFrom")){
					this.say(`Sorry, I only got you want an exchange rate ` +
					`based on ${this.ssml.spellOut(this.$inputs.ccyFrom.key.toUpperCase())}, ` +
					`but I didn't understand to what.`)
					this.removeState()
					return await this.toIntent("GetForexRateSlots.prompt")
				}
				//If we have the to, we're missing the from.
				else if(this.getInputValue("ccyTo")){
					this.say(`Sorry, I only got you want an exchange rate ` +
					`to ${this.ssml.spellOut(this.$inputs.ccyTo.key.toUpperCase())}, ` +
					`but I didn't understand based on what.`)
					this.removeState()
					return await this.toIntent("GetForexRateSlots.prompt")
				}
				else {
					this.say(`Sorry, I didn't get any of that. Let's try again.`)
					this.removeState()
					return await this.toIntent("GetForexRateSlots.START")
				}
			}
		},

		async StateCurrency(){
			kony.debug("*************** GetForexRateSlots.AwaitSlots.StateCurrency")
			const missing = this.getNextSlot()
			this.fillSlot(missing.id, this.getInputValue("currency"))
			return await this.toIntent('GetForexRateSlots.prompt')
		},

		Unhandled(){
			this.tell("Sorry, I didn't get that. Let's try again")
			this.removeState()
			this.toIntent("GetForexRateSlots.START")
		}
	}
}

module.exports = GetForexRateSlots
