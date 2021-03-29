"use strict"

const kony = require('kony-node')
const TransferStart = require("./start")
//const TransferSlots = require("./slots")
//const TransferResolve = require("./resolve")
//const TransferAgain = require("./again")

module.exports = {
	unpack: true, //Load these as global handlers, rather than as a state.
	TransferStart,
	//TransferResolve,
	//TransferSlots,
	//TransferAgain
}
