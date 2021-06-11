"use strict"
/*globals quantum*/
define([], function () {
	function createOutSpeech(speech){
		if(typeof quantum.OutSpeech ==="undefined"){
			throw Error( "Component quantum.JovoDialogue requires component quantum.OutSpeech")
		}
		const outSpeech = new quantum.OutSpeech({}, {}, {})
		outSpeech.text = speech
		return outSpeech
	}
	return createOutSpeech
});
