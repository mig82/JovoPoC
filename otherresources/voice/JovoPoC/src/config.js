// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
	logging: true,

	// The intentMap is especially useful in scenarios where the names of
	// certain intents differ across platforms.
	intentMap: {
		'AMAZON.StopIntent': 'END',
		'AMAZON.HelpIntent' : 'HelpIntent',
	},

	db: {
		FileDb: {
			pathToFile: '../db/db.json',
		},
	},

	inputMap: {
		'incomingInputName' : 'mappedInputName',
		// E.g. map DialogFlow's out-of-the-box given-name to match a name input type.
		// Allowing to write code across platforms, like this.tell('Hello ' + this.$inputs.name.value + '!');
		// 'given-name' : 'name',
	},

	intentsToSkipUnhandled: [
		'END'
	],
};
