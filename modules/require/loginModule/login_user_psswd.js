define(["core/getIdp"], function (getIdp) {

	function login(idpName, isSSOEnabled, username, password){

		//TODO: Pass deeplink URL's options.success_url as per
		//https://docs.kony.com/konylibrary/konyfabric/kony_fabric_user_guide/Content/KonyStudio/Invoking_Identity_Service_Viz.htm

		if (typeof username === "undefined" || typeof password === "undefined"){
			//Open in the device's preferred browser.
			throw Error("Provide a username and password")
		}

		var options = {
			isSSOEnabled,
			userid: username,
			password,
			//TODO: Make some of these into input parameters?
			loginOptions: {
				include_profile: true,
				continueOnRefreshError: true,
				persistLoginResponse: false,
				isOfflineEnabled: false
			}
		}

		return new Promise((resolve, reject) => {
			let idp = getIdp(idpName)
			//debugger
			idp.login(options, response => { //Success
				resolve(response)
			}, error => {
				reject(error)
			})
		})
	}

	return login
});
