# Jovo Web Client


## Request

```js
client.on( JovoWebClient.ClientEvent.Request, (request) => {
	kony.print(`flag-0 onRequest fired: ${JSON.stringify(request, null, 4)}`)
})
```

The `request` is of the form:

```json
{
	"version": "3.4.0",
	"type": "jovo-platform-web",
	"request": {
		"id": "8eb7cdc1-c935-417b-81ef-04485657c5af",
		"timestamp": "2021-06-10T17:29:16.713Z",
		"type": "LAUNCH",
		"body": {},
		"locale": "en",
		"data": {}
	},
	"context": {
		"appId": "",
		"platform": "",
		"device": {
			"id": "",
			"type": "BROWSER",
			"capabilities": {
				"AUDIO": true,
				"HTML": true,
				"TEXT": true
			}
		},
		"session": {
			"id": "6bff964d-ef6e-4128-989c-fe7aa505539a",
			"data": {
				"_JOVO_STATE_": "TakeMeToTheDocs"
			},
			"new": false,
			"lastUpdatedAt": "2021-06-10T17:09:01.917Z"
		},
		"user": {
			"id": "42b5aed9-e70d-4fcc-9fbc-4e0446a9d43b",
			"data": {}
		}
	}
}
```

## Response

```js
client.on( JovoWebClient.ClientEvent.Response, (response) => {
	kony.print(`flag-1 onResponse fired ${JSON.stringify(response, null, 4)}`)
})
```

The `response` is of the form:

```json
{
    "version": "3.4.0",
    "actions": [
        {
            "plain": "The content of this conversation is fully customizable. Our docs can show you how to update the app logic. Do you want me to take you there?",
            "ssml": "<speak>The content of this conversation is fully customizable. Our docs can show you how to update the app logic. Do you want me to take you there?</speak>",
            "type": "SPEECH"
        },
        {
            "replies": [
                {
                    "id": "Yes",
                    "label": "Yes",
                    "value": "Yes"
                },
                {
                    "id": "No",
                    "label": "No",
                    "value": "No"
                }
            ],
            "type": "QUICK_REPLY"
        }
    ],
    "reprompts": [
        {
            "plain": "The content of this conversation is fully customizable. Our docs can show you how to update the app logic. Do you want me to take you there?",
            "ssml": "<speak>The content of this conversation is fully customizable. Our docs can show you how to update the app logic. Do you want me to take you there?</speak>",
            "type": "SPEECH"
        }
    ],
    "user": {
        "data": {}
    },
    "session": {
        "data": {
            "_JOVO_STATE_": "TakeMeToTheDocs"
        },
        "end": false
    },
    "context": {
        "request": {
            "nlu": {
                "intent": {
                    "name": "LAUNCH"
                }
            }
        }
    }
}
```

## Action

```js
client.on( JovoWebClient.ClientEvent.Action, (action) => {
	kony.print(`flag-2 onAction fired ${JSON.stringify(action, null, 4)}`)
	if (action.type === JovoWebClient.ActionType.Custom) {
		switch (action.command) {
			case 'redirect':
				setTimeout(() => {
					window.open(action.value)
				}, 800)
				break
			default:
				kony.print(`flag-0: Received action ${action.command}`)
		}
	}
})
```

The `action` is of the form:

```json
{
    "plain": "The content of this conversation is fully customizable. Our docs can show you how to update the app logic. Do you want me to take you there?",
    "ssml": "<speak>The content of this conversation is fully customizable. Our docs can show you how to update the app logic. Do you want me to take you there?</speak>",
    "type": "SPEECH"
}
```

or...

```json
{
    "replies": [
        {
            "id": "Yes",
            "label": "Yes",
            "value": "Yes"
        },
        {
            "id": "No",
            "label": "No",
            "value": "No"
        }
    ],
    "type": "QUICK_REPLY"
}
```

The order in which these are fired is:

```
onRequest > onAction > onResponse > onAction
```
