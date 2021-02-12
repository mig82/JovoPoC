function onResponse(jovo) {
	console.log("onResponse")
	//TODO: Push event to Fabric analytics.
	console.log(jovo.getResponseObject());
}

module.exports = onResponse
