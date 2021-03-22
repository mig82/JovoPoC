const kony = require('kony-node')

/**
 * LoginIntent - A globally available intent to log into the user's account.
 *
 * @return {type}  description
 */
function LoginIntent(){
	kony.debug('***********LoginIntent')

	//TODO: If the user is already logged in,
	this.toStateIntent('OfferLogin', 'START')
}

module.exports = LoginIntent
