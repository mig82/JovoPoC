// If you are inside a state and want to move outside to a global (stateless)
// intent in the next request, use this.removeState()

this.removeState();
module.exports = {
	PlayIntent() {
		this.tell('hey');
	}
}
