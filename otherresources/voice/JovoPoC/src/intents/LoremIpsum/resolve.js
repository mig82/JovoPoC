"use strict"

//const kony = require('kony-node')

function getLoremIpsum(wordCount){
	const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do " +
	"eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim " +
	"veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
	"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " +
	"dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, " +
	"sunt in culpa qui officia deserunt mollit anim id est laborum."

	return lorem.split(/\s/).slice(0, wordCount).join(" ")
}

async function LoremIpsumResolve() {

	// kony.debug(`LoremIpsumResolve Inputs: ${JSON.stringify(this.$inputs, undefined, 4)}`)
	// kony.debug(`typeof this.$nlu ` + typeof this.$nlu)
	// kony.debug(`this.$nlu.prototype ` + this.$nlu.prototype)
	// kony.debug(`this.$nlu.constructor ` + this.$nlu.constructor)
	// kony.debug(JSON.stringify(this.$nlu, null, 4))

	const slots = ["wordCount"]
	if(this.includesInputs(slots)){

		/* TODO: Build some sort of automatic mapping between the slots and
		 * the service parameters... Or fall back on mapping the integration service
		 * operation's parameters from the slots of the same name. How do I get the
		 * metadata for an operation? Visualizer does it, so it's possible.
		 */
		console.log(`wordCount: ${JSON.stringify(this.$inputs.wordCount)}`)
		const wordCount = this.$inputs.wordCount.key
		const response = getLoremIpsum(wordCount)
		this.$speech.addText(response)
		this.$speech.addBreak('300ms')

		//this.followUpState('ForexService.GoAgain')
		this.tell(this.$speech)
		// this.followUpState(null)
		return this.toStateIntent("LoremIpsumAgain", "START")
	}
	else {
		//kony.debug(`Missing one of ${slots} in ${JSON.stringify(this.$inputs, undefined, 4)}`)
		this.tell("Sorry, I didn't get that.")
		this.removeState()
		return this.toIntent("LoremIpsumSlots.START")
	}
}

module.exports = LoremIpsumResolve
