"use strict"

const GetForexRateStart = require("./start")
const GetForexRateSlots = require("./slots")
const GetForexRateResolve = require("./resolve")
const GetForexRateAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	GetForexRateStart,
	GetForexRateResolve,
	GetForexRateSlots,
	GetForexRateAgain,
	public: true //Whether to offer this intent without login.
}
