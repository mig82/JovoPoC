"use strict"

/*
* Splits speech into sentences delimited by periods,
* question marks and exclamation marks.
*/
define(function () {

	//const PUNCTUATION_EN = /[^\.!\?]+[\.!\?]+/g
	const PUNCTUATION_ES = /[¡¿]*[^\.!\?]+[\.!\?]+/g

	function splitSpeech(speech){
		//TODO: Implement characters to split by depending on locale —e.g. Spanish has opening question/exclamation marks.
		let sentences = speech.match( PUNCTUATION_ES )
		sentences = sentences.map(c=>c.trim())
		return sentences
	}
	return splitSpeech
})
