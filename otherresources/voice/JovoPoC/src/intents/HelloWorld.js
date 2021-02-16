async function HelloWorld() {
	let sdk = this.$session.$data.sdk
	let service = sdk.getIntegrationService("HelloWorld")
	let greeting = await service.invokeOperation("greet")
	//this.ask("Hello World! What's your name?", 'Please tell me your name.')
	this.ask(greeting.message + " What's your name?", 'Please tell me your name.')
}

module.exports = HelloWorld
