define(["loginModule/login_user_psswd"], function(login){

	const idpName = "IronBankAuthN"

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
			this.view.loginButton.onClick = ()=>{
				login(idpName, false, "jon.snow@foo.com", 'Test!12345')
				.then(response => {
					alert (JSON.stringify(response))
				})
			}
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
