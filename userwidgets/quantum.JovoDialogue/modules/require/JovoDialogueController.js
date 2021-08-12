"use strict"

define(["./JovoProxy", "./createDialogueLoad",
		"./createOutSpeech", "./createInSpeech",
		"./createSuggestions", "./createSummary", "./splitSpeech"],
	function(jovo, createDialogueLoad,
			createOutSpeech, createInSpeech,
			createSuggestions, createSummary, splitSpeech) {

	let count = 0;
	const LAUNCH_DELAY = 1
	const SENTENCE_DELAY = 0.4
	const WORDS_PER_SEC = 3.2
	const SPACING = "10dp" //The space between conversation items.

	// Stuff specific to each instance of this component.
	return {

		scrollToEnd: function(){
			kony.timer.schedule2(() => {
				//TODO: Implement a smooth scroll like this instead:
				//https://www.w3schools.com/cssref/tryit.asp?filename=trycss_scroll_behavior
				//this.view.dialogueScroll.scrollToEnd()
				this.view.dialogueScroll.forceLayout()
			}, 0.2)
		},

		getDialogueSize: function(){
			return this.view.dialogueScroll.widgets().length
		},

		add: function(dialogueItem){
			delete dialogueItem.top
			//dialogueItem.opacity =  0
			dialogueItem.bottom = SPACING
			this.view.dialogueScroll.addAt(dialogueItem, 0)
			this.scrollToEnd()
		},

		send: function(text){
			text = text || this.view.input.text || ""
			if(text) text = text.trim()
			if(text) {
				this.removeSuggestions()
				jovo.sendText(text)
				this.add(createInSpeech(text))
				this.add(createDialogueLoad())
				this.view.input.placeholder = ""
			}
			this.view.input.text = ""
		},

		removeSuggestions: function(){ this.removeByPrefix("Suggestions") },

		removeLoader: function(){ this.removeByPrefix("DialogueLoad") },

		removeByPrefix(prefix){
			const conversation = this.view.dialogueScroll.widgets() || []
			for(let k = 0; k < Math.min(6, conversation.length); k++){
				if(typeof conversation[k].id === "string" && conversation[k].id.startsWith(prefix)){
					this.view.dialogueScroll.removeAt(k)
				}
			}
		},

		preShow: function(){
			kony.print(`flag JovoDialogue preShow`)
			//Clean up the design-time widgets.
			this.view.dialogueScroll.removeAll()
		},

		postShow: async function(){

			//Show loading gif while the initialisation and LAUNCH occur.
			this.add(createDialogueLoad())

			await jovo.init()

			//Don't really need this for now.
			//jovo.onRequest = () => {}
			//jovo.onResponse = () => {}

			//Record
			this.view.recordButton.onTouchStart = async () => { await jovo.record() }

			//Stop recording
			this.view.recordButton.onTouchEnd = async () => { await jovo.stop() }

			//LAUNCH
			this.view.launchButton.onClick = async () => { await jovo.launch() }
			//TODO: If the current claims token is not anoymous, tell the Jovo client to fire ON_SIGN_IN rather than LAUNCH?
			//decode(kony.sdk.getDefaultInstance().currentClaimToken)
			kony.timer.schedule2(jovo.launch, LAUNCH_DELAY)

			//Abort
			this.view.abortButton.onClick = async () => { await jovo.abort() }

			// Send the text when either the send button is clicked or Enter
			// is pressed on the keyboard.
			this.view.sendButton.onClick = ()=>{ this.send() }

			/*global document*/
			document.addEventListener('keydown', (e) => {
				if(e.code === "Enter"){
					this.send()
				}
			})

			//Add each sentence in the returned speech, one by one, and with a delay.
			jovo.onSpeech((speech) => {
				kony.print(`flag onSpeech.`)
				const sentences = splitSpeech(speech)
				this.removeLoader()
				let accumulated_delay = 0
				for(let k = 0; k < sentences.length; k++){
					const current = sentences[k]
					//the duration of the prior sentence is the count of words divided by the speech rate, plus the delay.
					//const previous_duration = k > 0 ? sentences[k-1].split(/\s+/).length/WORDS_PER_SEC : 0
					accumulated_delay += k > 0 ? sentences[k-1].split(/\s+/).length/WORDS_PER_SEC : 0
					kony.print(`flag k ${k}, waiting ${accumulated_delay}`)
					kony.timer.schedule2(()=>{
						this.add(createOutSpeech(current))
					}, SENTENCE_DELAY + accumulated_delay)
				}
				// this.view.input.setFocus(true) //TODO: Fix setting focus on the text box. It's not working.
			})

			jovo.onSuggestions((suggestions) => {
				kony.print(`flag onSuggestions.`)
				this.removeLoader()
				//TODO: Iterate over sentences and add a bubble for each sentence.
				if(suggestions.length > 1){
					this.view.input.placeholder = "Answer " + suggestions.slice(0, -1).join(", ") + " or " + suggestions.slice(-1)
				}
				else if(suggestions.length === 1){
					this.view.input.placeholder = "Answer " + suggestions[0]
				}
				//this.add(createSuggestions(suggestions.join(",")))
				this.add(createSuggestions(suggestions, (button) => {
					this.send(button.text)
				}))
			})

			//TODO: Implement what to do when a custom action is received.
			jovo.onCustom((command, value) => {
				if(command === "summary"){
					//alert(JSON.stringify(value, undefined, 4))
					this.add(createSummary(value))
				}
				//TODO: Add here the logic for whatever custom actions the component should handle on its own.
				//else if(command === "foo") {}
				else if(typeof this.onCustomAction === "function"){
					this.onCustomAction(command, value)
				}
				else{
					throw new Error("JovoDialogueController.onCustom is not assigned an action.")
				}
			})
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