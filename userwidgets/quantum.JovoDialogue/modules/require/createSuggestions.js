"use strict"
/*globals quantum*/
define([], function () {
	function createSuggestions(tags, callback){
		if(typeof quantum.Suggestions ==="undefined"){
			throw Error( "Component quantum.JovoDialogue requires component quantum.Suggestions")
		}
		const suggestions = new quantum.Suggestions({}, {}, {})
		suggestions.tags = tags
		suggestions.onPressed = callback
		return suggestions
	}
	return createSuggestions
});
