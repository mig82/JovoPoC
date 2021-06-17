"use strict"

//quantum.OutSpeech
define(function() {

	let count = 0
	return {
		preShow: function(){
			//Make the component invisible until it's been adjusted.
			this.view.opacity = 0
		},

		postShow: function(){
			//Once both width and height are adjusted, make the component visible.
			//TODO: Allow defining an animation function to make the component visible.
			//this.view.opacity = 1
			kony.animations.reveal(this.view, 0.5)
		},

		//TODO: This entire constructor is a copy of the one for component quantum.InSpeechController.
		//Need to either fuse them in a single component or break out this code into a dependency.
		constructor: function(baseConfig /*, layoutConfig, pspConfig*/) {
			if(typeof baseConfig.id === "undefined"){
				baseConfig.id = this.viewId + count++
			}
			baseConfig.height = "60dp"

			this.view.preShow = this.preShow
			this.view.postShow = this.postShow

			//The parent's doLayout will execute first.
			this.view.doLayout = (widget) => {
				this.maxWidth = widget.frame.width - 2 //-2 to account for 1px borders and avoid clipping.
				kony.print(`flag InSpeech parent doLayout ${this.view.id} width: ${this.labelWidth} max: ${this.maxWidth}`)
			}

			this.adjustedWidth = false //Assume the width needs adjusting.
			this.adjustedHeight = true //Assume the height does not.

			//The inner label's doLayout will execute last.
			this.view.textLabel.doLayout = (widget) => {
				//kony.print(`flag frame of ${widget.id} is ${JSON.stringify(widget.frame)}`)
				kony.print(`flag w: ${widget.frame.width}\tmaxW: ${this.maxWidth}\tt: '${widget.text} '`)
				let labelWidth = widget.frame.width
				let labelHeight = widget.frame.height

				//If either frame property is 0, then the frame has not been calculated yet.
				if(labelWidth * labelHeight === 0) return

				//The first time doLayout is fired we adjust the width.
				if(!this.adjustedWidth){

					//Make the width the smallest between the max width and the label width.
					//widget.width = Math.min(labelWidth, this.maxWidth)
					if(labelWidth >= this.maxWidth){
						widget.width = this.maxWidth
					}
					else{
						kony.print(`flag label ${widget.text} is smaller than chantbox. No need to resize.`)
					}

					//Having adjusted the width means the height now needs adjusting too.
					this.adjustedHeight = false
					//Make sure we don't adjust the width again the next time doLayout is executed.
					this.adjustedWidth = true
				}

				//Adjusting the width and wrapping will cause the label to be taller
				//Since having assigned width causes doLayout to fire again, use that to adjust the height as well.
				else if(!this.adjustedHeight){
					//Also adjust the height of the parent(s) to make room for the added rows of text.
					widget.parent.height = labelHeight //Adjust inFlex
					this.view.height = labelHeight //Adjust InSpeech

					//Since assigning the height will cause doLayout to fire again,
					//Make sure we don't end up here again.
					this.adjustedHeight = true
				}
			}

			//if the width has not been recalculated yet after a second, force it.
			kony.timer.schedule2(() => {
				if(!this.adjustedWidth){ this.view.forceLayout() }
			}, 0.2)

			//TODO: use preShow and postShow to animate the widget.
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {}
	}
})
