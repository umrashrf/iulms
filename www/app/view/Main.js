Ext.define('IU.view.Main', {
	extend : 'Ext.Container',
	xtype : 'iu-main',
	requires : ['IU.view.Login', 'IU.view.Tabs'],
	config : {
		id : 'iu-main',
		layout : 'card',
		items : [{
			id : 'iu-toolbar',
			xtype : 'toolbar',
			docked : 'top',
			title : 'IULMS',
			items : [{
				xtype : 'button',
				ui : 'back',
				text : 'Back',
				hidden : true,
				handler : function() {
					window.history.go(-1);
				}
			}, {
				xtype : 'spacer'
			}, {
				id : 'iu-buttons-login',
				xtype : 'button',
				text : 'Login',
				ui : 'action'
			}, {
				id : 'iu-buttons-logout',
				xtype : 'button',
				text : 'Logout',
				hidden : true
			}]
		}, {
			id : 'iu-login',
			xtype : 'iu-login'
		}, {
			id : 'iu-tabs',
			xtype : 'iu-tabs'
		}]
	}
});
