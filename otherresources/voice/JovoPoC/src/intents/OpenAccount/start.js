"use strict"

const kony = require("kony")

async function OpenAccountStart() {
	kony.debug("*************** OpenAccountStart")
	this.say([
		"Ok. I'll help you get your new account set up.",
		"Ok. Let's set up your new bank account."
	])

	//TODO: This does not make sense. If there's a token, the user is a customer, so go to open account.
	//TODO: 
	
	// If there's a token, the user is already a customer, so move on to slot filling.
	if(await this.getAccessToken()){
		return await this.toIntent("OpenAccountSlots.START")
	}
	// If there is no access token, go to onboarding.
	else{
		this.setSessionAttribute("next", "OpenAccountSlots.START")
		return await this.toIntent("AreYouACustomer.START")
	}
}

module.exports = OpenAccountStart
