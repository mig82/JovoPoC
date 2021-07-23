"use strict"
define([
	"quantum/layouts/getFrameWidth",
	"quantum/layouts/getFrameHeight"],
	function (getFrameWidth, getFrameHeight) {

	/**
	 * adjustSpeechSize - Adjust the width and height of a component of type
	 * quantum.InSpeech or quantum.OutSpeech.
	 *
	 * @param  {Component} comp the component instance.
	 * @param  {string} labelId the id of the label inside the component.
	 * @return {undefined}
	 */
	async function adjustSpeechSize(comp, labelId, revealFn){
		//Don't adjust more than once.
		if(!comp.adjusted){
			const label = comp.view[labelId]
			if(typeof label === "undefined") {
				throw new Error(`There's no widget called ${labelId} in component ${comp.id}.`)
			}

			//The max width is that of the parent, because the parent is set to 100% width.
			let maxWidth = await getFrameWidth(comp.view)
			//-2 to account for 1px borders and avoid clipping.
			maxWidth -= 2
			//Get the width of the label as it is without wrapping.
			const labelWidth = await getFrameWidth(label, true)
			//Make the width the smallest between the max width and the label width.
			label.width = Math.min(labelWidth, maxWidth)

			//Assigning width above will trigger doLayout again, so await for the new height after wrapping.
			const labelHeight = await getFrameHeight(label, true)
			//Adjust the height of the parent(s) to make room for the added rows of text.
			if(label.parent) label.parent.height = labelHeight //Adjust inFlex
			comp.view.height = labelHeight //Adjust InSpeech

			//Make sure we never adjust component more than once.
			comp.adjusted = true
		}
		if(typeof revealFn === "function"){
			return revealFn()
		}
		else{
			return comp.adjusted
		}
	}
	return adjustSpeechSize
})
