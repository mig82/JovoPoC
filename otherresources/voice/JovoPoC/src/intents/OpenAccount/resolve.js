"use strict"

//const util = require("util")

async function OpenAccountResolve() {

	/*[
		{ id: "title",  prompt: "What is your title?", suggestions: [ "Mr", "Mrs", "Miss", "Mx", "Doctor" ] },
		{ id: "gender", prompt: "What is your gender?", suggestions: [ "male", "female", "prefer not to say" ] },
		...
	]*/
	const slots = this.getSlots()
	let payload = {}
	if (slots instanceof Array) {
		for (let k = 0; k < slots.length; k++) {
			const slot = slots[k];
			payload[slot.id] = slot.value
		}
	}

	this.resetSlots()

	// const service = this.getSdk().getIntegrationService("Accounts")
	// const resp = await service.invokeOperation("create", {}, payload)
	const resp = await this.invokeServiceOperation("Accounts", "create", payload)

	//TODO: How do we generate conditionals for the response?
	if(resp.created && resp.iban){

		// const created = this.ssml.sayDate(this.formatDate(resp.created))
		
		//TODO: Split by groups of four, then spell out and pause on each.
		const iban = this.ssml.spellOut(resp.iban)

		const responses = [
			//TODO: The developer must be able to define different phrases to respond.
			`Ok! Your new account number is ${iban}.`
		]
		this.say(responses)

	}
	else{
		this.say( `The account could not be created at this time.`)
	}

	return this.toIntent("OpenAccountAgain.START")
}

module.exports = OpenAccountResolve
