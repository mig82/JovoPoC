"use strict"

const OpenAccountStart = require("./start")
const OpenAccountSlots = require("./slots")
const OpenAccountResolve = require("./resolve")
const OpenAccountAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	OpenAccountStart,
	OpenAccountResolve,
	OpenAccountSlots,
	OpenAccountAgain
}
