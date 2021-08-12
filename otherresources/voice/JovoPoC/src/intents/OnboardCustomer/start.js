"use strict"

const kony = require("kony-node")

async function start() {
	kony.debug("*************** OnboardCustomerStart")

	// If there's a token, the user is a customer, so go to open account.
	if(await this.getAccessToken()){
		this.say(["You're already a customer."])
		//TODO: Support conditionals in the routes.json file.
		return await this.toNext() //OfferLogin.START
	}
	// If there is no access token, ask if they're a customer. If not, go to onboarding. If they are, go to login.
	else{
		return await this.toIntent("OnboardCustomerSlots.START")
	}
}

module.exports = start
