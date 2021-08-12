"use strict"

const AccountsStart = require("./start")
const OfferAccountServices = require("./services")
//const AccountsSlots = require("./slots")
//const AccountsResolve = require("./resolve")
//const AccountsAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	AccountsStart,
	OfferAccountServices,
	//AccountsResolve,
	//AccountsSlots,
	//AccountsAgain
}
