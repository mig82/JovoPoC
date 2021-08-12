"use strict"

async function resolve() {

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

	//TODO: Define a function this.invokeServiceOperation seamlessly builds a payload out of the slots and inputs and calls a Fabric service op.
	//TODO: this.invokeServiceOperation should also show the loader for web applications, and use Alexa progressive responses while the work is being done.
	const service = this.getSdk().getIntegrationService("Users")
	const resp = await service.invokeOperation("create", {}, payload)

	//TODO: How do we generate conditionals for the response?
	if(resp.created && resp.email){

		const email = resp.email
		const responses = [
			//TODO: The developer must be able to define different phrases to respond.
			`Ok! Your new user name is ${email}.`,
			`Great! your new user name is ${email}.`
		]
		this.say(responses)

		const next = this.getSessionAttribute("next")
		this.removeState()
		if(next){
			this.setSessionAttribute("next", null)
			return await this.toIntent(next)
		}
		else{
			return await this.toIntent("OfferLogin.START")
		}
	}
	else{
		this.say( [`Sorry.`, "Apologies."])
		this.say( `Your user could not be created at this time.`)
		return await this.toIntent("OnboardCustomerAgain")
	}
}

module.exports = resolve
