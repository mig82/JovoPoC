"use strict"

const kony = require('kony-node')
const LinkAccountStart = require("./start")
const LinkAccountAwait = require("./await")

module.exports = {
	unpack: true, //Load these as separate handlers rather than as a state.
	LinkAccountStart,
	LinkAccountAwait
}
