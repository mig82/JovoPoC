const router = require('quantum-jovo').QuantumJovoRouter.getInstance()
const kony = require('kony-node')

function LinkAccount(){

	kony.debug("*************** LinkAccount")

	if(this.isAlexaSkill()){
		this.$speech.addText("Please link your account in the Alexa app.")
		this.tell(this.$speech)
		this.$alexaSkill.showAccountLinkingCard();
	}
	else if (this.isGoogleAction()){
		this.$speech.addText("Please link your Google account to this service.")
		this.tell(this.$speech)
		this.$googleAction.showAccountLinkingCard()
	}
	else{
		throw new Error(`Don't know how to link your account for '${this.constructor.name}'`)
	}
}

module.exports = LinkAccount
