// If you are inside a state and want to move outside to a global (stateless)
// intent in the next request, use this.removeState()

module.exports = {
	PlayIntent() {
		this.tell("Hey there. Let's play");
	},
	OtherIntent(){
		this.tell("I'm that other intent");
	}
}
