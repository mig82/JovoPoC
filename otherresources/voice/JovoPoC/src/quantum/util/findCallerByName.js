const callsite = require('callsite')
const path = require('path')
const kony = require('kony-node')

function findCallerByName(name){
	kony.debug(`\nAttempting to find caller by name '${name}'`)
	let stack = callsite()
	let caller = stack.filter((site, index) => {
		let fileName = site.getFileName()
		let basename = path.basename(fileName)
		kony.debug(`site[${index}]=` + fileName)
		return basename === name
	})[0]
	return caller
}

module.exports = findCallerByName
