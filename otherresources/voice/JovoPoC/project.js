// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
	alexaSkill: {
		nlu: 'alexa',
	},
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
						smallLogoImage: 'https://quantum-demos1.s3.eu-central-1.amazonaws.com/ibb/logo_blue.png',
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
				testingInstructions: "user@foo.com\nPw!123456"
			}
		},
	},
	endpoint: '${JOVO_WEBHOOK_URL}',
};
