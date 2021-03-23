"use strict"

const kony = require('kony-node')
const AwaitAccountLinking = {
	AccountLinkedIntent(){
		this.removeState()
		kony.debug("Forwarding to global ON_SIGN_IN")
		this.toIntent("ON_SIGN_IN")
	}
}

module.exports = AwaitAccountLinking
