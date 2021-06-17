"use strict"

/*globals window, setTimeout*/
define(["./JovoWebClient"], function (JovoWebClient) {

	const Client = JovoWebClient.Client

	/*JovoWebClient.RequestType includes
		Audio: "AUDIO"
		End: "END"
		Error: "ERROR"
		Event: "EVENT"
		Intent: "INTENT"
		Launch: "LAUNCH"
		Text: "TEXT"
		TranscribedText: "TRANSCRIBED_TEXT"
	*/
	const RequestType = JovoWebClient.RequestType

	//JovoWebClient.ClientEvent.*
	const Request = JovoWebClient.ClientEvent.Request
	const Response = JovoWebClient.ClientEvent.Response
	const Action = JovoWebClient.ClientEvent.Action

	//JovoWebClient.ActionType.*
	const Speech = JovoWebClient.ActionType.Speech
	const QuickReply = JovoWebClient.ActionType.QuickReply
	const Custom = JovoWebClient.ActionType.Custom

	const doNothing = ()=>{/*empty placeholder function*/}
	let onRequestCallback = doNothing
	let onResponseCallback = doNothing
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

	const client = new Client(hook, {
		audioRecorder: { sampleRate },
		speechRecognizer: { locale },
		audioPlayer: { enabled: true },
		speechSynthesizer: { enabled: true },
		repromptHandler: { enabled: false }
	})

	client.on( Request, (request) => {
		kony.print(`flag-10 onRequest fired: ${JSON.stringify(request)}`)
		onRequestCallback()
	})

	client.on( Response, (response) => {
		kony.print(`flag-20 onResponse fired ${JSON.stringify(response)}`)
		onResponseCallback()
	})

	client.on( Action, (action) => {
		kony.print(`flag-30 onAction fired ${JSON.stringify(action)}`)

		if (action.type === Speech) {

			const plain = action.plain
			const displayText = action.displayText
			const ssml = action.ssml
			const value = displayText || plain || (ssml ? client.$ssmlHandler.removeSSML(ssml) : undefined)
			if (!value) return

			kony.print(`flag-30.A: Received speech \n'${value}'`)
			onSpeechCallback(value.trim())
		}

		else if (action.type === QuickReply) {
			const replies = action.replies.map((reply) => { return reply.value})
			kony.print(`flag-30.B: Received quick reply action with options ${JSON.stringify(replies)}`)
			onSuggestionsCallback(replies)
		}

		else if (action.type === Custom) {
			kony.print(`flag-30.C: Received custom action ${action.command}`)
			switch (action.command) {
				case 'redirect':
					setTimeout(() => { window.open(action.value) }, 800)
					break
				default:
					kony.print(`flag-30.C.1: No reaction defined for custom action ${action.command}`)
			}
		}
	})


	async function init(){
		kony.print(`flag-00: Initialising client against ${hook}`)
		await client.initialize()
	}

	async function launch(){
		kony.print(`flag-01: Calling Jovo LAUNCH`)
		await client.createRequest({ type: 'LAUNCH' }).send()
	}

	async function record(){
		kony.print(`flag: Start recording`)
		if (!client.isInitialized) {
			throw Error(`Hold on. The Job Web Client instance is not yet initialised.`)
		}
		await client.startInputRecording(false)
	}

	async function stop() {
		kony.print(`flag: Stop recording`)
		await client.stopInputRecording()
	}

	async function abort() {
		kony.print(`flag: Aborting`)
		await client.abortInputRecording()
	}

// 	function onRequest(callback){
// 		onRequestCallback = callback
// 	}

// 	function onResponse(callback){
// 		onResponseCallback = callback
// 	}

	function onSpeech(callback){ onSpeechCallback = callback }

	function onSuggestions(callback){ onSuggestionsCallback = callback }

	function sendText(text){
		kony.print(`flag: sendText: '${text}'`)
		client.createRequest({
			type: RequestType.Text,
			//type: RequestType.Intent,
			body: { text }
		}).send()
	}

	return {
		init,
		launch,
		record,
		stop,
		abort,
		//onRequest,
		//onResponse,
		onSpeech,
		onSuggestions,
		//onCustom
		sendText
	};
});
