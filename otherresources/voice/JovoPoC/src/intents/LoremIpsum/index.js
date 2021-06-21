"use strict"

const LoremIpsumStart = require("./start")
const LoremIpsumSlots = require("./slots")
const LoremIpsumResolve = require("./resolve")
const LoremIpsumAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	LoremIpsumStart,
	LoremIpsumResolve,
	LoremIpsumSlots,
	LoremIpsumAgain,
	public: true //Whether to offer this intent without login.
}
