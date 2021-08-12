"use strict"

module.exports = {
	async START(){
		this.removeState()
		this.followUpState('StartOver')
		this.ask('There was an error. Would you like to start over?')
	},

	StartOver: {

		async YesIntent(){

			this.removeState()

			if(await this.getAccessToken()){
				return await this.toIntent("OfferPrivateServices")
			}
			else{
				return await this.toIntent("OfferPublicServices")
			}
		},

		async NoIntent(){
			return await this.toIntent("SayGoodbye")
		}
	}
}