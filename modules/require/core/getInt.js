define(["core/getSdk"], function (getSdk) {

	function getInt(serviceName){
		var sdk = getSdk();
		try{
			var service = sdk.getIntegrationService(serviceName);
			if(service === null || typeof service === "undefined" || !service){
				throw new Error(`Integration service '${serviceName}' not found.`);
			}
			return service;
		}
		catch(e){
			kony.print(`Error: Could not get integration service '${serviceName}':\n`+ e.stack);
			throw e;
		}
	}
    return getInt;
});
