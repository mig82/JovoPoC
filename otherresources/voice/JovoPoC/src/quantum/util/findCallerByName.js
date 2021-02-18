const callsite = require('callsite')
const path = require('path')

function findCallerByName(name){
	console.debug(`\nAttempting to find caller by name '${name}'`)
	let stack = callsite()
	let caller = stack.filter((site, index) => {
		let fileName = site.getFileName()
		let basename = path.basename(fileName)
		console.debug(`site[${index}]=` + fileName)
		return basename === name
	})[0]
	return caller
}

module.exports = findCallerByName
