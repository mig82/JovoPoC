function AccountsStart() {
	this.say(['Ok!', 'Great!'])
	this.say(["Let's go to accounts."])
	this.removeState()
	this.toNext()
}

module.exports = AccountsStart
