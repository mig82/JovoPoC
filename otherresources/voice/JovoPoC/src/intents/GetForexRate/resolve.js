"use strict"

const round = require('../../util/round')
//const util = require("util")

async function GetForexRateResolve() {

	//TODO: Get the mandatory slots from a config file —e.g.
	//{ccyTo:	{ id: 'GBP', value: 'Sterling',	key: 'GBP', name: 'ccyTo' },
	// ccyFrom:	{ id: 'EUR', value: 'Euro', 	key: 'EUR', name: 'ccyFrom' }}

	//kony.debug(`Inputs: ${JSON.stringify(this.$inputs, undefined, 4)}`)

	/* TODO: Build some sort of automatic mapping between the slots and
	* the service parameters... Or fall back on mapping the integration service
	* operation's parameters from the slots of the same name. How do I get the
	* metadata for an operation? Visualizer does it, so it's possible.
	*/
	const base = this.$inputs.ccyFrom.key //e.g. "NOK"
	const symbols = this.$inputs.ccyTo.key //e.g. "GBP"
	const payload = { base, symbols }

	//It's silly to have the service name hardcoded here. Need a config file for this.
	//const service = this.$app.getSdk().getIntegrationService("EcbForex")
	const service = this.getSdk().getIntegrationService("EcbForex")
	const resp = await service.invokeOperation("getRates", {}, payload)

	//TODO: How do we generate conditionals for the response?
	if(!!resp.date && !!resp.rates && !!resp.rates[symbols]){

		/* TODO: How would a user map fields in the service output to the voice
		response? e.g. the rate. */
		const rate = round(resp.rates[symbols])
		const date = this.ssml.sayDate(resp.date, "ymd")
		const responses = [
			//TODO: The user must be able to define different phrases to respond.
			`As of ${date}, the ${base}/${symbols} exchange rate is approximately ${rate}.`,
			`The ${base}/${symbols} exchange rate on ${date} is approximately ${rate}.`,
			`As of ${date}, one ${base} is approximately ${rate} ${symbols}.`
		]
		this.say(responses)
	}
	else{
		this.say( `The ${base}/${symbols} exchange rate was not found.`)
	}

	//this.followUpState('ForexService.GoAgain')
	//this.tell(this.$speech)
	// this.followUpState(null)
	return this.toStateIntent("GetForexRateAgain", "START")
}

module.exports = GetForexRateResolve
