Ext.define('IU.view.Tabs', {
	extend : 'Ext.TabPanel',
	xtype : 'iu-tabs',
	config : {
		cls : 'iu-tabs',
		tabBarPosition : 'bottom',
		activeItem : 2,
		items : [{
			id : 'iu-news',
			xtype : 'iu-news',
			title : 'News',
			iconCls : 'rss'
		}, {
			id : 'iu-semesterschedule',
			xtype : 'iu-semesterschedule',
			title : 'Schedule',
			iconCls : 'calendar'
		}, {
			id : 'iu-attendance',
			xtype : 'iu-attendance',
			title : 'Attendance',
			iconCls : 'user'
		}, {
			id : 'iu-transcript',
			xtype : 'iu-transcript',
			title : 'Transcript',
			iconCls : 'file'
		}, {
			id : 'iu-about',
			xtype : 'iu-about',
			title : 'About',
			iconCls : 'info'
		}]
	}
});
