const findDirByCallerName = require("./findDirByCallerName")

let appRootPath
function getAppRoot() {
	if(typeof appRootPath === "undefined"){
		appRootPath = findDirByCallerName("app.js")
	}
	return appRootPath
}

module.exports = getAppRoot
