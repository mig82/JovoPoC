"use strict"

const fs = require('fs')
const path = require('path')

function requireFolder(absPath){

	let relPath = path.relative(__dirname, absPath)

	console.log(
		`\nLoading modules from...\n` +
		`\tabsolute path: '${absPath}'\n` +
		`\trelative path: '${relPath}'\n`
	)
	let subdirs = fs.readdirSync(absPath)

	console.log(`Modules found in '${relPath}': ` + subdirs.length)
	console.log(subdirs)

	let modules = {}

	subdirs.forEach(function(moduleName) {
		let modulePath = `./${relPath}/${moduleName}`
		moduleName = moduleName.replace(/\.js/, "")

		console.debug(`\nRequiring: ${moduleName}`)
		console.debug(`From: ${modulePath}`)

		try{
			let handler = require(modulePath)
			console.debug(`Ok`)
			modules[moduleName] = handler
		}
		catch(e){
			console.error(`Error loading ${modulePath}: ${e.message}`)
		}
	});
	return modules
}
module.exports = requireFolder
