const kony = require('kony-node')

/**
 * LoginIntent - A globally available intent to log into the user's account.
 *
 * @return {type}  description
 */
function LoginIntent(){
	kony.debug('***********LoginIntent')
	//this.toIntent('OfferLogin.AwaitDecision.YesIntent') // TODO: This won't work. Issue #906
	this.toStateIntent('OfferLogin', 'START')
}

module.exports = LoginIntent
