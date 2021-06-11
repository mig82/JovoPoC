"use strict"
/*globals quantum*/
define([], function () {
	function createInSpeech(speech){
		if(typeof quantum.InSpeech ==="undefined"){
			throw Error( "Component quantum.JovoDialogue requires component quantum.InSpeech")
		}
		const inSpeech = new quantum.InSpeech({}, {}, {})
		inSpeech.text = speech
		return inSpeech
	}
	return createInSpeech
});
