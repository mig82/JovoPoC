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
};
