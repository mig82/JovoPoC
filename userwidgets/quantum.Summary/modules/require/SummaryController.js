"use strict"

define([], function() {

	let count = 0
	return {

		setContent: function(content){
			/*[ { "id": "foo", "value": "foo 123" }, ...]*/
			if(content instanceof Array){
				const decoratedData = content.map(e => {return {key: e.id, value: e.value}})
				this.view.seg1.setData(decoratedData)
			}
		},

		preShow: function(){
			// Do things like placing widgets out of sight. —e.g.
			// this.hideStuff()
		},

		postShow: function(){
			// Do things like animating stuff back in, call services, pupulate data
			// or bind widget events. —e.g.:
			// this.view.doFooButton.onClick = doFoo
			// this.view.barLabel = this.bar
			// animateIn(this.view.someAnimatedWidget)
		},

		onHide: function(){
			// Do things like freeing up and reseting variables.
		},

		//Use the constructor to bind preShow, postShow and onHide.
		constructor: function(baseConfig /*, layoutConfig, pspConfig*/) {

			count++
			if(typeof baseConfig.id === "undefined"){
				baseConfig.id = "Summary" + count
			}

			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
			this.view.onHide = this.onHide

			let adjusted = false
			this.view.seg1.doLayout = () => {
				let height = this.view.seg1.frame.height + "dp"
				//Avoid unnecessarily firing doLayout when the height is already adjusted to the content.
				if(!adjusted && this.view.height !== height){
					this.view.height = height
					adjusted = true
				}
			}
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
			//Field foo
// 			defineGetter(this, "foo", () => {return this._foo})
// 			defineSetter(this, "foo", (foo) => {this._foo = foo})
		}
	}
})