"use strict"

function loadConfig(configPath){
	configPath = configPath || './config.json'

	const defaultConfig = require(configPath)
	console.log(`\nConfig file path: '${configPath}'`)
	console.log(defaultConfig)

	const env = {}
	env.FABRIC_APP_NAME = process.env.FABRIC_APP_NAME
	env.FABRIC_APP_VERSION = process.env.FABRIC_APP_VERSION
	env.FABRIC_APP_KEY = process.env.FABRIC_APP_KEY
	env.FABRIC_APP_SECRET = process.env.FABRIC_APP_SECRET
	env.FABRIC_APP_SERVICE_URL = process.env.FABRIC_APP_SERVICE_URL
	console.log("\nEnvironment variables:")
	console.log(env)

	const config = {
		name: env.FABRIC_APP_NAME || defaultConfig.name,
		version: env.FABRIC_APP_VERSION || defaultConfig.version,
		key: env.FABRIC_APP_KEY || defaultConfig.key,
		secret: env.FABRIC_APP_SECRET || defaultConfig.secret,
		serviceUrl: env.FABRIC_APP_SERVICE_URL || defaultConfig.serviceUrl
	}

	console.log("\nFabric app configuration")
	console.log(config)

	return config
}

module.exports = loadConfig
