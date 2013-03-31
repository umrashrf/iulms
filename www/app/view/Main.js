Ext.define('IU.view.Main', {
	extend : 'Ext.Container',
	xtype : 'iu-main',
	requires : ['IU.view.Login', 'IU.view.Tabs'],
	config : {
		id : 'iu-main',
		layout : 'card',
		activeItem : (((window.localStorage.getItem("id") != null) && (window.localStorage.getItem("pwd") != null)) ? 1 : 0),
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
