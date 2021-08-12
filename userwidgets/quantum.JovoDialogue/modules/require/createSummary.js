"use strict"
/*globals quantum*/
define([], function () {

	/**
	* Where summary is of the form /*[ { "id": "foo", "value": "foo 123" }, ...]
	*/
	function createSummary(summary){
		if(typeof quantum.Summary ==="undefined"){
			throw Error( "Component quantum.JovoDialogue requires component quantum.Summary")
		}
		const sum = new quantum.Summary({}, {}, {})
		sum.setContent(summary)
		return sum
	}
	return createSummary
});
