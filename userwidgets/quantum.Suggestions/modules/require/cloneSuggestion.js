define(function () {

	function cloneSuggestion(cloned, id, text, left){
		var config = {
			id: id,
			isVisible: true,
			skin: cloned.skin,
			focusSkin: cloned.focusSkin,
			text: text,
			height: cloned.height
		}

		if(left){config.left = left}

		var layout = {
			containerWeight: cloned.containerWeight,
			padding: cloned.padding,
			margin: cloned.margin,
			displayText: true
		}

		var platformConfig = {}

		var suggestion = new kony.ui.Button(config, layout, platformConfig)
		return suggestion
	}
	return cloneSuggestion
})
