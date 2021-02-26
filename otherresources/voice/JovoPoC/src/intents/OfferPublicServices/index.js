const kony = require('kony-node')

const OfferPublicServices = {
	main() {

		//TODO: Build this array from the list of intents available.
		let opts_array = [
			"exchange rates",
			"financial news",
			"locate ATM's"
		]
		let opts_string = opts_array.slice(0, -1).join(", ") + ", or " + opts_array.slice(-1)

		//this.ask(
		this.$speech.addText(
			`You can ask about ${opts_string}.`,
			`We're still here. Please choose ${opts_string}.` +
			`If you need help, just say "help".`
		)

		if(this.isAlexaSkill()){
			//...
		}
		else if(this.isGoogleAction()){
			this.$googleAction.showSuggestions(opts_array)
		}

		kony.debug("before: " + this.getState())
		this.followUpState('OfferPublicServices.AwaitServiceChoice')
		this.ask(this.$speech)
		kony.debug("after: " + this.getState())
		//TODO: Add suggestions for Google Assistant.
	},

	AwaitServiceChoice: {

		//TODO: This is repetitive. Need a more suscinct way to write these handles.
		ChooseForexService: function() {
			this.$speech.addText(['Ok!', 'Great!'])
			.addText(["Let's go to exchange rates."])
			this.followUpState(null)
			this.toIntent("ForexService.main")
		},

		ChooseNewsService() {
			this.$speech.addText(['Ok!', 'Great!'])
			.addText(["Let's check the news."])
			this.followUpState(null)
			this.toIntent("NewsService.main")
		},

		ChooseATMsService() {
			this.$speech.addText(['Ok!', 'Great!'])
			.addText(["Let's find an ATM for you."])
			this.followUpState(null)
			this.toIntent("ATMsService.main")
		}
	}
}

module.exports = OfferPublicServices
