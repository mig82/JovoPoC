function LAUNCH (){
	console.log("LAUNCH")
	//TODO: Push event to Fabric analytics.
	return this.toIntent('Welcome');
	//this.toStateIntent('PLAY_STATE', 'PlayIntent')
}
module.exports = LAUNCH
