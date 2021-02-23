const kony = require('kony-node')

/**
 * Returns the instance of the SDK attached to the context.
 */
function getSdk() {
	const $context = this //The Jovo app instance.
	let sdk = $context.$data.sdk
	if(typeof sdk === "object" && !(sdk instanceof kony.sdk)){
		//this is likely the result of the SDK being serialised and parsed back into an object.
		sdk = kony.sdk.fromJson(sdk)
	}
	else if(typeof sdk === "undefined"){
		kony.warn("The SDK for this context is undefined")
	}
	return sdk
}

module.exports = getSdk
