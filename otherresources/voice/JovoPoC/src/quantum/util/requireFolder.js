"use strict"

const fs = require('fs')
const path = require('path')
const kony = require('kony-node')

function requireFolder(absPath){

	let relPath = path.relative(__dirname, absPath)

	kony.log(
		`\nLoading modules from...\n` +
		`\tabsolute path: '${absPath}'\n` +
		`\trelative path: '${relPath}'\n`
	)
	let subdirs = fs.readdirSync(absPath)

	kony.log(`Modules found in '${relPath}': ` + subdirs.length)
	kony.log(subdirs)

	let modules = {}

	subdirs.forEach(function(moduleName) {
		let modulePath = `./${relPath}/${moduleName}`
		moduleName = moduleName.replace(/\.js/, "")

		//kony.debug(`\nRequiring: ${moduleName}`)
		//kony.debug(`From: ${modulePath}`)

		try{
			let handler = require(modulePath)
			//kony.debug(`Ok`)
			modules[moduleName] = handler
		}
		catch(e){
			kony.error(`Error loading ${modulePath}\n${e.name}: ${e.message}\n${e.stack}` )
		}
	});
	return modules
}
module.exports = requireFolder
