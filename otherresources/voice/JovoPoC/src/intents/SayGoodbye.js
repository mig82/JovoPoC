"use strict"

async function SayGoodbye(){
	this.say("Ok.")
	this.say([
		"Visit us again soon.",
		"See you soon.",
		"We hope to see you again soon."
	])
}

module.exports = SayGoodbye
