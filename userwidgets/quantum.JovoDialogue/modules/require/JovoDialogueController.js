define(["./JovoProxy"], function(jovo) {
//define([], function() {

	// Static stuff
	let count = 0;
	const LAUNCH_DELAY = 1

	// Stuff specific to each instance of this component.
	return {
		send: function(){
			let text = this.view.input.text
			if(text) text = text.trim()
			if(text) {
				jovo.sendText(text)
				this.view.inText.text = text
			}
			this.view.input.text = ""
		},

		preShow: function(){
			kony.print(`JovoDialogue preShow`)
		},

		postShow: async function(){

			await jovo.init()

			this.view.recordButton.onTouchStart = async () => { await jovo.record() }
			this.view.recordButton.onTouchEnd = async () => { await jovo.stop() }
			//this.view.launchButton.onClick = async () => { await jovo.launch() }
			kony.timer.schedule2(jovo.launch, LAUNCH_DELAY)
			this.view.abortButton.onClick = async () => { await jovo.abort() }

			// Send the text when either the send button is clicked or Enter
			// is pressed on the keyboard.
			this.view.sendButton.onClick = this.send

			/*global document*/
			document.addEventListener('keydown', (e) => {
				if(e.code === "Enter"){
					this.send()
				}
			})

			jovo.onSpeech((speech) => {
				//TODO: Add a bubble for each sentence.
				this.view.outText.text = speech
			}, true)

			jovo.onSuggestions((suggestions) => {
				//TODO: Iterate over sentences and add a bubble for each sentence.
				if(suggestions.length > 1){
					this.view.input.placeholder = "Answer " + suggestions.slice(0, -1).join(", ") + " or " + suggestions.slice(-1)
				}
				else if(suggestions.length === 1){
					this.view.input.placeholder = "Answer " + suggestions[0]
				}
			})

			//TODO: Implement what to do when a custom action is received.
			//jovo.onCustom
		},

		onHide: function(){
			// Do things like freeing up and reseting variables.
		},

		//Use the constructor to bind preShow, postShow and onHide.
		constructor: function(/*baseConfig, layoutConfig, pspConfig*/) {
			this.view.preShow = this.preShow;
			this.view.postShow = this.postShow;
			this.view.onHide = this.onHide;
			count++
			if(count > 1){
				kony.print(`WARN: Do you really need more than one instance of the chatbot component? there's ${count} instances now.`)
			}
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
			//Field foo
// 			defineGetter(this, "foo", () => {return this._foo;});
// 			defineSetter(this, "foo", (foo) => {this._foo = foo;});
		}
	};
});