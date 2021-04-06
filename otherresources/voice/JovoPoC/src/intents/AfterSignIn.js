const kony = require('kony-node')

async function AfterSignIn() {

	kony.debug("*************** AfterSignIn")

	//TODO: Get the name of the Identity service from a YAML config file.
	const idp = this.getSdk().getIdentityService("IronBankOauth2")
	const profile = await idp.getProfile()
	//kony.debug(JSON.stringify(profile, undefined, 4))
	//TODO: Fetch the user's first name from the Fabric Identity profile.
	const firstName = profile.username || profile.given_name || "dear user"
	kony.warn("firstName: " + firstName)

	//TODO: Use SSML tag to say "welcome" with excitement.
	this.tell(`Welcome ${firstName}!`)

	await this.toNext()
}

module.exports = AfterSignIn
