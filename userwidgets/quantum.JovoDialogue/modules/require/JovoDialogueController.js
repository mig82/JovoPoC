define(["./JovoProxy"], function(jovo) {
//define([], function() {

	// Static stuff
	let count = 0;

	// Stuff specific to each instance of this component.
	return {

		preShow: function(){
			kony.print(`JovoDialogue preShow`)
		},

		postShow: async function(){

			await jovo.init()

			this.view.launchButton.onClick = async () => {
				await jovo.launch()
			}
			this.view.recordButton.onTouchStart = async () => {
				await jovo.record()
			}
			this.view.recordButton.onTouchEnd = async () => {
				await jovo.stop()
			}
			this.view.abortButton.onClick = async () => {
				await jovo.abort()
			}
			this.view.sendButton.onClick = () => {
				const text = this.view.input.text
				if(text) jovo.sendText(text)
				this.view.input.text = ""
			}

			jovo.onSpeech((speech) => {
				//TODO: Add a bubble for each sentence.
				this.view.outText.text = speech
			})

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