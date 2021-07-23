"use strict"

/*
* Splits speech into sentences delimited by periods,
* question marks and exclamation marks.
*/
define(function () {

	//const PUNCTUATION_EN = /[^\.!\?]+[\.!\?]+/g
	//This second version ignores pucturation when not followed by a space.
	const PUNCTUATION_EN = /(?:[^\n.!?;:]|[\n.!?;:](?!\s))+[\n.!?;:]+/g
	//const PUNCTUATION_ES = /[¡¿]*[^\.!\?]+[\.!\?]+/g

	function splitSpeech(speech){
		//TODO: Implement characters to split by depending on locale —e.g. Spanish has opening question/exclamation marks.
		let sentences = speech.match( PUNCTUATION_EN )
		sentences = sentences.map(c=>c.trim())
		return sentences
	}
	return splitSpeech
})
