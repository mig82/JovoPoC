define([], function(){

	function onCustomAction(command, value){
		switch (command) {
			case 'redirect':
				/*globals window, setTimeout*/
				setTimeout(() => { window.open(value) }, 800)
				break
			case 'signin': //fall through.
			case 'login':
				//TODO: surface an onCustom, or a more specific onRequestLogin callback for the
				//app to define how to sign in the user.
				//alert("Must sign the user in!")
				kony.timer.schedule2(()=>{
					kony.router.goTo("login")
				}, 1)
				break
			case 'summary':
				alert(JSON.stringify(value, undefined, 4))
				break
			default:
				kony.print(`flag-30.C.1: Don't know how to handle custom action '${command}' yet.`)
		}
	}

	return{
		init: function(){
			//Stuff you only want done once the first time the screen is visited.
		},
		preShow: function(){
			//Move stuff out of sight if you want to then animate back in.
			//NEVER use preShow to call services.
		},
		postShow: function(){
			//Call services to populate screen.
			//Animate stuff back into sight.
			this.view.JovoDialogue.onCustomAction = onCustomAction
		},
		onHide: function(){
			//Make sure you destroy/empty large variables that won't be needed anymore.
		},
		onBreakpointChange: function(){
			//For responsive web, tell your components about the change in screen width.
		},
		onNavigate: function(){
			//Wire it all together.
			this.view.init = this.init
			this.view.preShow = this.preShow
			this.view.postShow = this.postShow
			this.view.onHide = this.onHide
			this.view.onBreakpointChange = this.onBreakpointChange
		},
		onDestroy: function(){
			//Free up or reset any large variables.
		}
	};
});
