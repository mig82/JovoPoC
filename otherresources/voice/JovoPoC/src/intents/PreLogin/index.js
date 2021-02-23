const PreLogin = {
	LogIn() {
		this.$speech.addText(['Ok!', 'Great!', 'Fantastic!'])
		.addText(["Let's go there.", "Let me open the door for you."])
		this.toIntent("Private")
	},

	DontLogIn() {
		this.$speech.addText(['Ok!', 'No problem.'])
		.addText(["I'm sure we can still help you.", "There's still lots you can do."])
		this.toIntent("Public")
	}
}

module.exports = PreLogin
