const kony = require('kony-node')

//TODO: Move this to QuantumJovoApp as a core handler.
function LINK_ACCOUNT(){

	kony.debug("*************** LINK_ACCOUNT")

	if(this.isAlexaSkill()){
		this.$speech.addText(
			"We'll send you a notification for you to link your account from the Alexa app." +
			" Please let us know when that is done."
		)
		this.$reprompt.addText("Have you linked your account? Remember to let us know when it's done.")
		//TODO: Go to a state waiting for the linking to be done, and then redirect to the last relevant handler.

		this.removeState()
		this.followUpState("LinkAccountAwait")

		this.ask(this.$speech, this.$reprompt)
		this.$alexaSkill.showAccountLinkingCard()
	}
	else if (this.isGoogleAction()){
		//this.$speech.addText("Let's link your Google account.")
		kony.debug("Forwarding user to Google Actions account linking scene.")
		//this.$googleAction.showAccountLinkingCard()
		this.$googleAction.setNextScene('AccountLinkingScene')
		this.ask(this.$speech)
	}
	else{
		throw new Error(`Don't know how to link your account for '${this.constructor.name}'`)
	}
}

module.exports = LINK_ACCOUNT
