function GetForexRateStart() {
	this.$speech.addText(['Ok!', 'Great!'])
	.addText(["Let's go to exchange rates."])
	this.removeState()
	this.toStateIntent("GetForexRateSlots", "START")
}

module.exports = GetForexRateStart
