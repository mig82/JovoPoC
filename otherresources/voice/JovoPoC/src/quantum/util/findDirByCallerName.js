const findCallerByName = require("./findCallerByName")

const path = require('path')
const kony = require('kony-node')

function findDirByCallerName(name){
	let caller = findCallerByName(name)
	let callerFileName = caller.getFileName()
	kony.debug("Caller file: " + callerFileName)
	let callerDir = path.dirname(callerFileName)
	kony.debug("Caller dir: " + callerDir)
	return callerDir
}

module.exports = findDirByCallerName
