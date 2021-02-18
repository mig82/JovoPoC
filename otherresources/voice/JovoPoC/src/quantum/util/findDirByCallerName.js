const findCallerByName = require("./findCallerByName")

const path = require('path')

function findDirByCallerName(name){
	let caller = findCallerByName(name)
	let callerFileName = caller.getFileName()
	console.debug("Caller file: " + callerFileName)
	let callerDir = path.dirname(callerFileName)
	console.debug("Caller dir: " + callerDir)
	return callerDir
}

module.exports = findDirByCallerName
