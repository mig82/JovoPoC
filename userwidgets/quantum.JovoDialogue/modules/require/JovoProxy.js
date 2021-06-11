"use strict"

/*globals window, setTimeout*/
define(["./JovoWebClient"], function (JovoWebClient) {

	const doNothing = ()=>{/*empty placeholder function*/}
	let onSpeechCallback = doNothing
	let onSuggestionsCallback = doNothing
// 	let onCustomCallback = doNothing

	if(typeof window === "undefined"){
		throw Error(`Component quantum.JovoDialogue can only be used in web applications`)
	}

	if(typeof JovoWebClient === "undefined"){
		throw Error(`The JovoWebClient lib is not defined.`)
	}

	//TODO: Get these from a Fabric service or from input parameters.
	const protocol = "http"
	const host = "localhost"
	const port = 4000
	const hook = `${protocol}://${host}:${port}/webhook`
	const sampleRate = 8000

	//TODO: get this from parsing kony.i18n.getCurrentLocale()
	const locale = "en"

	const client = new JovoWebClient.Client(hook, {
		audioRecorder: { sampleRate },
		speechRecognizer: { locale },
		audioPlayer: { enabled: true },
		speechSynthesizer: { enabled: true },
		repromptHandler: { enabled: false }
	})

	client.on( JovoWebClient.ClientEvent.Request, (request) => {
		kony.print(`flag-0 onRequest fired: ${JSON.stringify(request, null, 4)}`)
	})

	client.on( JovoWebClient.ClientEvent.Response, (response) => {
		kony.print(`flag-1 onResponse fired ${JSON.stringify(response, null, 4)}`)
	})

	client.on( JovoWebClient.ClientEvent.Action, (action) => {
		kony.print(`flag-2 onAction fired ${JSON.stringify(action, null, 4)}`)

		if (action.type === JovoWebClient.ActionType.Speech) {

			const plain = action.plain
			const displayText = action.displayText
			const ssml = action.ssml
			const value = displayText || plain || (ssml ? client.$ssmlHandler.removeSSML(ssml) : undefined)
			if (!value) return

			kony.print(`flag-2.A: Received speech \n'${value}'`)
			const sentences = value.split('.')
				//TODO: Iterate over sentences and add a bubble for each sentence.
			for(let k = 0; k < sentences.length; k++){
				const sentence = sentences[k] + "."
				onSpeechCallback(sentence)
			}
		}

		else if (action.type === JovoWebClient.ActionType.QuickReply) {
			const replies = action.replies.map((reply) => { return reply.value})
			kony.print(`flag-2.B: Received quick reply action with options ${JSON.stringify(replies)}`)
			onSuggestionsCallback(replies)
		}

		else if (action.type === JovoWebClient.ActionType.Custom) {
			kony.print(`flag-2.C: Received custom action ${action.command}`)
			switch (action.command) {
				case 'redirect':
					setTimeout(() => {
						window.open(action.value)
					}, 800)
					break
				default:
					kony.print(`flag-4: No reaction defined for custom action ${action.command}`)
			}
		}
	})


	async function init(){
		await client.initialize()
		await client.createRequest({ type: 'LAUNCH' }).send()
	}

	async function record(){
		if (!client.isInitialized) {
			throw Error(`Hold on. The Job Web Client instance is not yet initialised.`)
		}
		await client.startInputRecording(false)
	}

	async function stop() {
		await client.stopInputRecording()
	}

	async function abort() {
		await client.abortInputRecording()
	}

	function onSpeech(callback){
		onSpeechCallback = callback
	}

	function onSuggestions(callback){
		onSuggestionsCallback = callback
	}
    return {
		init,
		record,
		stop,
		abort,
		onSpeech,
		onSuggestions
    };
});
