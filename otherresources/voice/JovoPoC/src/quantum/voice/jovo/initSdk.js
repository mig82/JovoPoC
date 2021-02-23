const kony = require('kony-node')
const loadConfig = require('../fabric/loadConfig')

/**
 * Creates and initialises and instance of the SDK and attaches it to the context.
 */
async function initSdk() {

	const $context = this //The Jovo app instance.

	if(typeof $context.$data.sdk === "undefined"){
		kony.log("Attaching an SDK instance to this Jovo context")

		const config = await loadConfig()
		const sdk = new kony.sdk()
		await sdk.init(config.key, config.secret, config.serviceUrl)
		//kony.debug(sdk.getAppConfig())
		$context.$data.sdk = sdk

		kony.info(sdk)
	}
	else{
		kony.log("This Jovo context already has an SDK instance.")
	}
}

module.exports = initSdk
