const kony = require('kony-node')

async function ExchangeRates() {
	const sdk = this.$app.getSdk()

	kony.log("Resolving ExchangeRates with SDK instance " + sdk.__id)
	const service = sdk.getIntegrationService("EcbForex")
	const resp = await service.invokeOperation("getLatest", {}, {
		base: "NOK",
		symbols: "GBP"
	})
	//this.ask("Hello World! What's your name?", 'Please tell me your name.')
	this.tell(JSON.stringify(resp))
}

module.exports = ExchangeRates
