define(function () {

	function addTo(widget, parent){
		return new Promise((resolve, reject) => {
			try{
				widget.doLayout = (framed) => { resolve(framed.frame) }
				parent.add(widget) //This should force the doLayout function to be executed.
				parent.forceLayout() //But since it only fires for the first one, let's force it.
			}
			catch(e){ reject(e) }
		})
	}
	return addTo
})