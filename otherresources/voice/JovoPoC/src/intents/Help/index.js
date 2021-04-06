const kony = require('kony-node')

const entity = "Iron Bank"

function HelpIntent(){
	kony.debug("Help")
	//TODO: Push event to Fabric analytics.

	this.$speech.addText("We understand you need help. That's ok. That's what we're here for.")
	.addBreak('500ms')
	.addText(
		`The ${entity}'s voice banking experience allows you to access ` +
		"several services from your virtual assistant. If you wish to " +
		"check your accounts, loans, cards and other products, " +
		"you'll have to link your account and sign in. If you just want to ask " +
		"about other non-personal services, such as exchange rates or financial news, " +
		"you may choose to remain anonymous."
	)
	this.tell(this.$speech)
	this.toNext()
}
module.exports = HelpIntent
