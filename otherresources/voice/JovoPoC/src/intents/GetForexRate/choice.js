function GetForexRateChoice() {
	this.$speech.addText(['Ok!', 'Great!'])
	.addText(["Let's go to exchange rates."])
	this.removeState()
	//this.toIntent("ForexService.main")
	this.toIntent("GetForexRateSlots.main")
}

module.exports = GetForexRateChoice
