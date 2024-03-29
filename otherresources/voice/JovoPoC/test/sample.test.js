'use strict';

//Visualizer already takes up the default port 3000.
//process.env.JOVO_PORT = 4000

const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistantconv');

jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    test('should return a welcome message and ask for the name at "LAUNCH"', async () => {
      const conversation = testSuite.conversation();

      const launchRequest = await testSuite.requestBuilder.launch();
      const response = await conversation.send(launchRequest);

      expect(response.isAsk("Hello World! What's your name?", 'Please tell me your name.')).toBeTruthy();
    });
  });
}
