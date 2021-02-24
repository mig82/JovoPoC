const kony = require('kony-node')

async function PlaySong() {

	this.$speech.addText('We are the Iron Bank!')
	.addBreak('300ms')
	.addAudio("https://mingosounds.com/wp-content/uploads/2020/07/game-of-thrones-ringtone.mp3")

	this.tell(this.$speech)
}

module.exports = PlaySong
