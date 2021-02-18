async function ExchangeRates() {
	let sdk = this.$session.$data.sdk
	console.log("Resolving ExchangeRates with SDK instance " + sdk.__id)
	let service = sdk.getIntegrationService("EcbForex")
	let resp = await service.invokeOperation("getLatest", {}, {
		base: "NOK",
		symbols: "GBP"
	})
	//this.ask("Hello World! What's your name?", 'Please tell me your name.')
	this.tell(JSON.stringify(resp))
}

module.exports = ExchangeRates
