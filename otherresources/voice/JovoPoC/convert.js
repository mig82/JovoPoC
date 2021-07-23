"use strict"

const fs = require("fs/promises")
//const { NativeFileInformation } = require('jovo-model');
const { JovoModelDialogflow } = require('jovo-model-dialogflow');

async function main(){
	//TODO: Iterate over all the model files in ./models
	const jovoModelData = require("./models/en-US.json")
	// const modelFile = await fs.open("./models/en-US.json", 'r+')
	// const data = await modelFile.readFile("utf8")
	// const jovoModelData = JSON.parse(data) 

	console.log("jovoModelData")
	console.log(jovoModelData)

	// Convert Jovo Model -> Dialogflow Model
	const jovoModelInstanceDialogflow = new JovoModelDialogflow();
	const locale = 'en-US';
	jovoModelInstanceDialogflow.importJovoModel(jovoModelData, locale);
	const dialogflowModel = jovoModelInstanceDialogflow.exportNative();
	

	console.log("dialogflowModel")
	console.log(dialogflowModel)

	//Create ./platforms/dialogFlow
	const dfSubdir = "./platforms/dialogFlow"
	await fs.rm(dfSubdir, { recursive: true, force: true })
	await fs.mkdir(dfSubdir)
	console.log("dialogFlow subdir created")
	const dialogflowFile = await fs.open(`${dfSubdir}/${locale}.json`, 'w+')
	await dialogflowFile.write(JSON.stringify(dialogflowModel, undefined, 4))
}
main()
