function GetForexRateStart() {
	this.say(['Ok!', 'Great!'])
	this.say(["Let's go to exchange rates."])
	this.removeState()
	this.toStateIntent("GetForexRateSlots", "START")
}

module.exports = GetForexRateStart
