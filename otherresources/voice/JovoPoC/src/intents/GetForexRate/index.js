"use strict"

const kony = require('kony-node')
const GetForexRateChoice = require("./choice")
const GetForexRateSlots = require("./slots")
const GetForexRate = require("./intent")
const GetForexRateAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	GetForexRateChoice,
	GetForexRateSlots,
	GetForexRate,
	GetForexRateAgain
}
