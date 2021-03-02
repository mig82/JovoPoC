"use strict"

const kony = require('kony-node')
const round = require('../../util/round')

async function GetForexRate() {

	kony.debug(this.$inputs)
	//TODO: if $inputs does not have all the mandatory fields, forward to slot filling.

	/* TODO: Should I build uild some automatic mapping between the slots and
	 * the parameters? Or should the inputs in the integration service as shown
	 * by its metadata translate into the inputs/slots/parameters of the
	 * utterance?*/
	const base = this.$inputs.ccyFrom.key //e.g. "NOK"
	const symbols = this.$inputs.ccyTo.key //e.g. "GBP"
	const payload = { base, symbols }

	//It's silly to have the service name hardcoded here. Need a config file for this.
	const service = this.$app.getSdk().getIntegrationService("EcbForex")
	const resp = await service.invokeOperation("getLatest", {}, payload)
	kony.debug(JSON.stringify(resp))

	//TODO: How do we generate conditionals for the response?
	if(resp.rates[symbols]){

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
	this.toIntent("GetForexRateAgain.main")
}

module.exports = GetForexRate
