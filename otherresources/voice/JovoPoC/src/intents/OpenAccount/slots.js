"use strict"

const kony = require("kony")

const OpenAccountSlots = {

	async START(){
		kony.debug("*************** OpenAccountSlots.START")
		this.say(`We'll need some details to set up your bank account.`)

		//TODO: Get the slots to be filled from a model.
		this.setSlots([
			{ id: "currency", prompt: "What currency would you like to bank in?", suggestions: [ "US Dollars", "Euros", "British Pounds" ] },
			{ id: "type", prompt: "What kind of account would you want to set up?", suggestions: [ "savings account", "current account" ] },
			// { id: "alias", prompt: "What would you like to name this account?"}
		])

		return await this.toIntent('OpenAccountSlots.prompt')
	},

	async prompt(){
		kony.debug("*************** OpenAccountSlots.prompt")
		this.followUpState('OpenAccountSlots.AwaitSlots')
		const nextSlot = this.getNextSlot()

		if(nextSlot){
			this.showSuggestions2(nextSlot.suggestions, nextSlot.prompt)
			//this.prompt(nextSlot.prompt)
			this.$speech.addText(nextSlot.prompt)
			this.ask(this.$speech)
		}
		else{
			//TODO: Where do we go when all slots are fulfilled?
			const question = `Is this correct?`
			if(this.isWebApp()){
				this.say(`This is what we have so far.`)
				this.showSlotsSummary()
				this.ask(question)
			}
			else{
				this.ask(
					`I heard ` + this.articulateSlotsSummary() + `. ` +
					question
				)
			}
			this.showSuggestions2(["yes", "no"], question)
		}
		
	},

	AwaitSlots: {
		//For confirmation of the summary.
		async YesIntent(){
			this.say(`Great!`)
			return await this.toIntent('OpenAccountResolve')
		},

		//For when something in the summary is incorrect.
		async NoIntent(){
			this.say(`Ok. Let's start over.`)
			return await this.toIntent('OpenAccountSlots.START')
		},

		async StateCurrency(){
			kony.debug("*************** OpenAccountSlots.AwaitSlots.StateCurrency")
			// this.fillSlots()
			return await this.toIntent('OpenAccountSlots.prompt')
		},

		async StateAccountType(){
			kony.debug("*************** OpenAccountSlots.AwaitSlots.StateAccountType")
			// this.fillSlots()
			return await this.toIntent('OpenAccountSlots.prompt')
		},

		async Unhandled(){
			this.say(`Sorry, I didn't get that.`)
			return await this.toIntent('OpenAccountSlots.prompt')
		}
	}
}

module.exports = OpenAccountSlots
