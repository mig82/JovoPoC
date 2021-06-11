define(function() {

	let count = 0
	return {
		constructor: function(baseConfig /*, layoutConfig, pspConfig*/) {
			if(typeof baseConfig.id === "undefined"){
				baseConfig.id = "DialogueLoad" + count++
			}
			baseConfig.height = "60dp"
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	}
})
