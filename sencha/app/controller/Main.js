Ext.define('IU.controller.Main', {
	extend : 'Ext.app.Controller',

	config : {
		focusedComponents : 0,
		routes : {
			'/login' : 'showLogin',
			'/tabs' : 'showTabs'
		},
		refs : {
			main : '#iu-main',
			toolbar : '#iu-toolbar',
			loginButton : '#iu-buttons-login',
			logoutButton : '#iu-buttons-logout',
			login : '#iu-login',
			tabs : '#iu-tabs',
			attendance : '#iu-attendance',
			transcript : '#iu-transcript',
			news : '#iu-news'
		},
		control : {
			login : {
				submit : 'onLoginPass',
				exception : 'onLoginFail'
			},
			loginButton : {
				tap : 'onLogin'
			},
			logoutButton : {
				tap : 'onLogout'
			},
			news : {
				itemtap : 'onNewsTap'
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

		var cmps = Ext.ComponentQuery.query('textfield');
		for (var c = 0; c < cmps.length; c++) {
			cmps[c].on('focus', this.onFieldFocus, this);
			cmps[c].on('blur', this.onFieldBlur, this);
		}
	},
	showLogin : function() {
		if(this.isLoggedIn()) {
			return false;
		}

		this.getLoginButton().show();
		this.getLogoutButton().hide();
		this.getToolbar().setTitle('IULMS');

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

		this.getLoginButton().hide();
		this.getLogoutButton().show();
	},
	showAttendance : function() {
		this.getLogoutButton().show();
		this.getToolbar().setTitle('Attendance');

		this.getTabs.setActiveItem(0);

		var target = this.getAttendance();

		console.log(target);

		target.setMasked({
			xtype : 'loadmask',
			message : 'Loading Attendance'
		});

		if (!target.getStore().isLoaded()) {
			target.getStore().load({
				params : {
					id : window.localStorage.getItem("id"),
					pwd : window.localStorage.getItem("pwd")
				},
				callback : function() {
					target.setMasked(false);
				}
			});
		}
	},
	showTranscript : function() {
		this.getLogoutButton().show();
		this.getToolbar().setTitle('Transcript');

		this.getTabs.setActiveItem(1);
	},
	onLogin : function() {
		Ext.getCmp('iu-login').submit();
	},
	/**
	 * Event Handlers
	 */
	onFieldFocus : function(sender, e, eOpts) {
		this.setFocusedComponents(this.getFocusedComponents() + 1);
	},
	onFieldBlur : function(sender, e, eOpts) {
		var me = this;

		this.setFocusedComponents(this.getFocusedComponents() - 1);

		var task = Ext.create('Ext.util.DelayedTask', function() {
			if (me.getFocusedComponents() <= 0) {
				window.scrollTo(0, 0);
			}
		});
		task.delay(250);
	},
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
	onLoginPass : function(sender, result, e, eOpts) {
		if(result && result.success == "true") {
			var input = sender.getValues();

			window.localStorage.setItem("id", input.id);
			window.localStorage.setItem("pwd", input.pwd);

			// these variables prevents loading stores on every paint
			// explicitly ask them to load on next pain
			StoreStates['news'] = false;
			StoreStates['semesterschedule'] = false;
			StoreStates['attendance'] = false;
			StoreStates['transcript'] = false;
			StoreStates['about'] = false;

			sender.reset();
			sender.setMasked(false);

			this.redirectTo('/tabs');
		}
	},
	onLoginFail : function(sender, result, eOpts) {
		if(result && result.success == "false") {
			sender.setMasked(false);
			Ext.Msg.alert("Oops!", "Reg No or Password is wrong.", Ext.emptyFn);
		} else {
			Ext.Msg.alert("Oops!", "Internal error occurred. Please consult developer.", Ext.emptyFn);
		}
	},
	onLogout : function() {
		window.localStorage.removeItem("id");
		window.localStorage.removeItem("pwd");

		// these variables prevents loading stores on every paint
		StoreStates['news'] = false;
		StoreStates['semesterschedule'] = false;
		StoreStates['attendance'] = false;
		StoreStates['transcript'] = false;
		StoreStates['about'] = false;

		this.redirectTo('/login');
	},
	onNewsTap : function(sender, index, target, record, e, eOpts) {

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
