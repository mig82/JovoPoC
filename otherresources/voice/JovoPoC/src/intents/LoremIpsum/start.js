function LoremIpsumStart() {
	this.$speech.addText(['Ok!', 'Great!'])
	.addText(["Let's get some Lorem Ipsum."])
	this.removeState()
	this.toStateIntent("LoremIpsumSlots", "START")
}

module.exports = LoremIpsumStart
