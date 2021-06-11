"use strict"
/*globals quantum*/
define([], function () {
	function createDialogueLoad(){
		if(typeof quantum.DialogueLoad ==="undefined"){
			throw Error( "Component quantum.JovoDialogue requires component quantum.DialogueLoad")
		}
		const dialogueLoad = new quantum.DialogueLoad({}, {}, {})
		return dialogueLoad
	}
	return createDialogueLoad
});
