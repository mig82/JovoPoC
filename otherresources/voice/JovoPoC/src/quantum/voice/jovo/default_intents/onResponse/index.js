function onResponse(jovo) {
	console.log("\n******************************** onResponse")
	//TODO: Push event to Fabric analytics.
	console.log(jovo.getResponseObject());
}

module.exports = onResponse
