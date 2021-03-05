"use strict"

const kony = require('kony-node')
const GetForexRateStart = require("./start")
const GetForexRateSlots = require("./slots")
const GetForexRateResolve = require("./resolve")
const GetForexRateAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	GetForexRateStart,
	GetForexRateResolve,
	// GetForexRate:{
	// 	GetForexRateSlots,
	// 	GetForexRateAgain
	// }
	GetForexRateSlots,
	GetForexRateAgain
}
