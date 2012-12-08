Ext.define('IU.controller.Main', {
	extend : 'Ext.app.Controller',

	config : {
		routes : {
			'/login' : 'showLogin',
			'/tabs' : 'showTabs',
			'/attendance' : 'showAttendace',
			'/transcript' : 'showTranscript'
		},
		refs : {
			main : '#iu-main',
			toolbar : '#iu-toolbar',
			logoutButton : '#iu-buttons-logout',
			login : '#iu-login',
			tabs : '#iu-tabs',
			attendance : '#iu-attendance',
			transcript : '#iu-transcript'
		},
		control : {
			login : {
				beforesubmit : 'onBeforeLogin',
				submit : 'onLogin'
			}
		}
	},
	init : function() {

	},
	launch : function() {
		if(window.location.href.indexOf("#") < 0) {
			if(this.isLoggedIn()) {
				this.redirectTo("/tabs");
			} else {
				this.redirectTo("/login");
			}

		}
	},
	showLogin : function() {
		if(this.isLoggedIn()) {
			return false;
		}

		this.getLogoutButton().hide();
		this.getToolbar().setTitle('IQRA University');

		this.getMain().animateActiveItem(0, {
			type : 'slide',
			direction : 'right'
		});
	},
	showTabs : function() {
		if(!this.isLoggedIn()) {
			return false;
		}

		this.getMain().animateActiveItem(1, {
			type : 'slide',
			direction : 'left'
		});

		this.redirectTo('/attendance');
	},
	showAttendance : function() {
		this.getLogoutButton().show();
		this.getToolbar().setTitle('Attendance');

		this.getTabs.setActiveItem(0);
	},
	showTranscript : function() {
		this.getLogoutButton().show();
		this.getToolbar().setTitle('Transcript');

		this.getTabs.setActiveItem(1);
	},
	/**
	 * Event Handlers
	 */
	onBeforeLogin : function(sender, values, options, eOpts) {
		// check if it's right and return
		if(values.id.replace(/ /g, "").length <= 0) {
			Ext.Msg.alert("Oops!", "Reg. No. is required.", Ext.emptyFn);
			return false;
		}

		if(values.pwd.replace(/ /g, "").length <= 0) {
			Ext.Msg.alert("Oops!", "Password is required.", Ext.emptyFn);
			return false;
		}

		sender.setMasked({
			xtype : 'loadmask',
			message : 'Logging In...'
		});
	},
	onLogin : function(sender, result, e, eOpts) {
		if(result && result.success == "true") {
			var input = sender.getValues();

			window.localStorage.setItem("id", input.id);
			window.localStorage.setItem("pwd", input.pwd);

			sender.reset();

			sender.setMasked(false);

			this.redirectTo('/tabs');
		}
	},
	/**
	 * Utility Functions
	 */
	isLoggedIn : function() {
		if(window.localStorage.getItem('id') != null && window.localStorage.getItem('pwd') != null) {
			return true;
		}
		return false;
	}
});
