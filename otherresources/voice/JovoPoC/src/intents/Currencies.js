async function Currencies() {
	let sdk = this.$session.$data.sdk
	let service = sdk.getIntegrationService("Currencies")
	let symbols = await service.invokeOperation("getSymbolsMap")
	//this.ask("Hello World! What's your name?", 'Please tell me your name.')
	this.tell(JSON.stringify(symbols))
}

module.exports = Currencies
