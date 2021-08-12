"use strict"

const OnboardCustomerStart = require("./start")
const OnboardCustomerSlots = require("./slots")
const OnboardCustomerResolve = require("./resolve")
//const OnboardCustomerAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	OnboardCustomerStart,
	OnboardCustomerResolve,
	OnboardCustomerSlots,
	//OnboardCustomerAgain
}
