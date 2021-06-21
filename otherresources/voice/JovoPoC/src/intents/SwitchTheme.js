function SwitchTheme() {

	const theme = this.$inputs.theme ? this.$inputs.theme.key : ""

	if (theme !== 'dark' && theme !== 'light') {
		return this.toIntent('Unhandled')
	}

	if(this.isWebApp()){
		this.addCustomAction('set-theme', theme)
		return this.tell(`OK, ${theme} mode.`)
	}
	else{
		return this.tell(`I'm afraid I can't switch themes on ${this.getPlatformName()} yet.`)
	}

}

module.exports = SwitchTheme
