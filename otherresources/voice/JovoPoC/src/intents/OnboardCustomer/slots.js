"use strict"

const kony = require("kony")

module.exports = {

	async START(){
		kony.debug("*************** OnboardCustomerSlots.START")

		this.say(`We'll need some information to make you a customer.`)
		this.say("It should take about 5 minutes.")

		//TODO: Get the slots to be filled from a model.
		this.setSlots([
			{ id: "title", prompt: "What is your title?", suggestions: [ "Mr", "Mrs", "Miss", "Mx", "Doctor" ] },
			// { id: "name", prompt: "What is your full name?",},
			{ id: "gender", prompt: "What is your gender?", suggestions: [ "male", "female", "prefer not to say" ] },
			{ id: "birth_date", type: "date", prompt: "What is your date of birth?"},
			{ id: "country", prompt: "What is your nationality?", suggestions: [ "UK", "Ireland", "Spain" ] },
			{ id: "employment", prompt: "What is your employment status?", suggestions: [ "employed", "self employed", "unemployed", "student", "homemaker", "retired" ] }
		])

		this.removeState()
		return await this.toIntent('OnboardCustomerSlots.prompt')
	},

	async prompt(){
		kony.debug("*************** OnboardCustomerSlots.prompt")
		this.followUpState('OnboardCustomerSlots.AwaitSlots')
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
			this.say(`Great! Please wait a second while we set up your user.`)
			return await this.toIntent('OnboardCustomerResolve')
		},

		//For when something in the summary is incorrect.
		async NoIntent(){
			this.say(`Ok. Let's start over.`)
			return await this.toIntent('OnboardCustomerSlots.START')
		},

		async StateTitle(){
			kony.debug("*************** OnboardCustomerSlots.AwaitSlots.StateTitle")
			// this.fillSlots()
			return await this.toIntent('OnboardCustomerSlots.prompt')
		},

		async StateGender(){
			kony.debug("*************** OnboardCustomerSlots.AwaitSlots.StateGender")
			// this.fillSlots()
			return await this.toIntent('OnboardCustomerSlots.prompt')
		}, 

		async StateBirthDate(){
			kony.debug("*************** OnboardCustomerSlots.AwaitSlots.StateBirthDate")
			// this.fillSlots()
			return await this.toIntent('OnboardCustomerSlots.prompt')
		},

		async StateNationality(){
			kony.debug("*************** OnboardCustomerSlots.AwaitSlots.StateNationality")
			// this.fillSlots()
			return await this.toIntent('OnboardCustomerSlots.prompt')
		},
	
		async StateEmployment(){
			kony.debug("*************** OnboardCustomerSlots.AwaitSlots.StateEmployment")
			// this.fillSlots()
			return await this.toIntent('OnboardCustomerSlots.prompt')
		},

		async Unhandled(){
			this.say(`Sorry, I didn't get that.`)
			return await this.toIntent('OnboardCustomerSlots.prompt')
		}
	}
}
