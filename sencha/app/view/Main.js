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
				xtype : 'spacer'
			}, {
				id : 'iu-buttons-login',
				xtype : 'button',
				text : 'Login',
				ui : 'action',
				cls : 'iu-button',
				iconMask : true,
				iconCls : 'user_add'
			}, {
				id : 'iu-buttons-logout',
				xtype : 'button',
				text : 'Logout',
				ui : 'action',
				cls : 'iu-button',
				iconMask : true,
				iconCls : 'user_remove2',
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
