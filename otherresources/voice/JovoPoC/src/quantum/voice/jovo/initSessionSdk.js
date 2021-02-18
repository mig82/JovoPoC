const kony = require('kony-node')
const loadConfig = require('../fabric/loadConfig')

// TODO: Should this stay part of NEW_SESSION only or should other events be
// able to invoke it? For now it makes sense to leave it here.
const initSessionSdk = async ($session) => {

	if(typeof $session.$data.sdk === "undefined"){
		console.log("Attaching an SDK instance to this Jovo session")

		const config = await loadConfig()
		const sdk = new kony.sdk()
		await sdk.init(config.key, config.secret, config.serviceUrl)
		//console.debug(sdk.getAppConfig())
		$session.$data.sdk = sdk
	}
	else{
		console.log("This Jovo session already has an SDK instance.")
	}
}

module.exports = initSessionSdk
