"use strict"

const kony = require('kony-node')
const round = require('../../util/round')
const util = require("util")

async function GetForexRateResolve() {

	//kony.debug("GetForexRateResolve $inputs: " + util.inspect(this.$inputs))

	//TODO: Get the mandatory slots from a config file —e.g.
	//{ccyTo:	{ id: 'GBP', value: 'Sterling',	key: 'GBP', name: 'ccyTo' },
	// ccyFrom:	{ id: 'EUR', value: 'Euro', 	key: 'EUR', name: 'ccyFrom' }}

	kony.warn(`Inputs: ${JSON.stringify(this.$inputs, undefined, 4)}`)

	const slots = ["ccyFrom", "ccyTo"]
	if(this.includesInputs(slots)){

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
		kony.debug(JSON.stringify(resp))

		//TODO: How do we generate conditionals for the response?
		if(!!resp.date && !!resp.rates && !!resp.rates[symbols]){

			/* TODO: How would a user map fields in the service output to the voice
			response? e.g. the rate. */
			const rate = round(resp.rates[symbols])

			const responses = [
				//TODO: The user must be able to define different phrases to respond.
				`As of ${resp.date}, the ${base}/${symbols} exchange rate is approximately ${rate}.`,
				`The ${base}/${symbols} exchange rate on ${resp.date} is approximately ${rate}.`
			]
			this.$speech.addText(responses)
		}
		else{
			this.$speech.addText(
				`As of ${resp.date}, the ${base}/${symbols} exchange rate is unknown.`
			)
		}
		//TODO: How does a user define the breaks?
		this.$speech.addBreak('300ms')

		//this.followUpState('ForexService.GoAgain')
		this.tell(this.$speech)
		// this.followUpState(null)
		return this.toStateIntent("GetForexRateAgain", "START")
	}
	else {
		//kony.debug(`Missing one of ${slots} in ${JSON.stringify(this.$inputs, undefined, 4)}`)
		this.tell("Sorry, I didn't get that.")
		this.removeState()
		return this.toIntent("GetForexRateSlots.START")
	}
}

module.exports = GetForexRateResolve
