Ext.define('IU.view.Tabs', {
	extend : 'Ext.TabPanel',
	xtype : 'iu-tabs',
	config : {
		cls : 'iu-tabs',
		tabBarPosition : 'bottom',
		items : [{
			id : 'iu-news',
			xtype : 'iu-news',
			title : 'News'
		}, {
			id : 'iu-attendance',
			xtype : 'iu-attendance',
			title : 'Attendance'
		}, {
			id : 'iu-transcript',
			xtype : 'iu-transcript',
			title : 'Transcript'
		}]
	}
});
