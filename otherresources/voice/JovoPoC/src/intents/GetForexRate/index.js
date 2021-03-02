"use strict"

const kony = require('kony-node')
const GetForexRateStart = require("./start")
const GetForexRateSlots = require("./slots")
const GetForexRate = require("./resolve")
const GetForexRateAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	GetForexRateStart,
	GetForexRateSlots,
	GetForexRate,
	GetForexRateAgain
}
