"use strict"
const kony = require('kony-node')
const LoremIpsumSlots = {
	START(){
		this.$speech.addText(`How many words do you need?`)
		this.followUpState('LoremIpsumSlots.AwaitSlots')
		this.ask(this.$speech)
	},

	AwaitSlots: {
		async LoremIpsumResolve(){
			kony.warn(`Inputs: ${JSON.stringify(this.$inputs, undefined, 4)}`)
			this.removeState()
			await this.toIntent("LoremIpsumResolve")
		},

		Unhandled(){
			this.tell("Sorry, let's try again")
			this.removeState()
			this.toIntent("LoremIpsumSlots.START")
		}
	}
}

module.exports = LoremIpsumSlots
