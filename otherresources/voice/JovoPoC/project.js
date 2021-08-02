// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

//TODO: Load all of this from a JSON file so that it can be easily written into by Visualizer.
module.exports = {
	endpoint: '${JOVO_WEBHOOK_URL}',

	stages: {
		//jovo build --stage dev_alexa
		dev_alexa: {
			//Amazon Alexa.
			alexaSkill: {
				nlu: 'alexa',
				manifest: {
					publishingInformation: {
						locales: {
							"en-US": {
								summary: "The Iron Bank of Braavos",
								examplePhrases: [
									"Alexa open Iron Bank"
								],
								keywords: [
									"banking",
									"financial services"
								],
								name: "Iron Bank",
								description: "The Iron Bank's voice banking experience, with access to accounts, cards, personal finance mangement and more.",
								smallIconUri: "https://quantum-demos1.s3.eu-central-1.amazonaws.com/ibb/logo_blue.png",
								largeIconUri: "https://quantum-demos1.s3.eu-central-1.amazonaws.com/ibb/logo_blue.png"
							}
						},
						isAvailableWorldwide: true,
						testingInstructions: "Test username: user@foo.com\nTest password: Pw!123456",
						category: "BUSINESS_AND_FINANCE",
						distributionCountries: []
					}
				}
			}
		},

		//jovo build --stage dev_gactions
		dev_gactions: {
			//Google Assistant using Actions on Google.
			googleAction: {
				projectId: 'jovopoc',
				manifest: {
					settings: {
						defaultLocale: 'en-US',
						localizedSettings: {
							'en-US': {
								displayName: 'The Iron Bank of Braavos',
								pronunciation: 'the iron bank of braavos',
								developerEmail: 'miguel.fernandez@temenos.com',
								developerName: 'Miguelángel Fernández',
								fullDescription: "The Iron Bank's voice banking experience, with access to accounts, cards, personal finance mangement and more.",
								privacyPolicyUrl: '',
								shortDescription: "The Iron Bank's voice banking experience.",
								// smallLogoImage: 'https://quantum-demos1.s3.eu-central-1.amazonaws.com/ibb/logo_blue.png',
								termsOfServiceUrl: ''
							}
						},
						accountLinking: {
							appClientId: 'jovopoc',
							authGrantType: 'AUTH_CODE',
							authorizationUrl: 'https://100032668.auth.konycloud.com/oidc/authorize/IronBankOauth2',
							linkingType: 'OAUTH',
							scopes: ['openid', 'email', 'profile', 'phone', 'offline_access'],
							tokenUrl: 'https://tpko-dev.konycloud.com/services/Oauth2Token/token',
							useBasicAuthHeader: true,
						},
						testingInstructions: "Test username: user@foo.com\nTest password: Pw!123456"
					}
				},
			}
		},

		//jovo build --stage dev_dialogflow
		dev_dialogflow: {
			// This is a hack to be able to build the Dialogflow model, 
			// even though we're only using it as the NLU for chatbots 
			// while we also use Actions on Google for Google Assistant.
			googleAction: {
				nlu: 'dialogflow',
				dialogflow: {
					projectId: 'jovopoc-p9by',
					keyFile: './secure/dialogflow_service_acct_key.json'
				}
			}
		}
	}
}
