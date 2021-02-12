"use strict"

const fs = require('fs')
const path = require('path')

function loadHandlers(absPath, handlers){

	let relPath = path.relative(__dirname, absPath)

	console.log(
		`\nLoading handlers from...\n` +
		`\tabsolute path: '${absPath}'\n` +
		`\trelative path: '${relPath}'\n`
	)
	let subdirs = fs.readdirSync(absPath)

	console.log(`Handlers found in '${relPath}': ` + subdirs.length)
	console.log(subdirs)

	if(typeof handlers !== "object") handlers = {}

	subdirs.forEach(function(handlerName) {
		let modulePath = `./${relPath}/${handlerName}`
		handlerName = handlerName.replace(/\.js/, "")
		console.log(`\nRequiring: ${handlerName}`)
		console.debug(`From: ${modulePath}`)
		let handler = require(modulePath)
		handlers[handlerName] = handler
	});
	return handlers
}
module.exports = loadHandlers
