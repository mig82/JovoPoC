define(function () {

	function cloneRow(cloned, id){
		var config = {
			id: id,
			isVisible: true,
			skin: cloned.skin,
			height: cloned.height
		}

		var layout = {
			containerWeight: cloned.containerWeight,
			padding: cloned.padding,
			margin: cloned.margin
		}

		var platformConfig = {}

		var newRow = new kony.ui.FlexContainer(config, layout, platformConfig)
		newRow.layoutType = kony.flex.FLOW_HORIZONTAL
		return newRow
	}
	return cloneRow
})
