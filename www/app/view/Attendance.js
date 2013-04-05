Ext.define('IU.view.Attendance', {
	extend : 'Ext.List',
	xtype : 'iu-attendance',
	config : {
		cls : 'iu-attendance',
		layout : 'fit',
		store : 'Attendance',
		grouped : true,
		selectedCls : '',
		itemTpl : ['<div>', '<div class="iu-attendance-item-course">{course_name}</div>', '<div class="iu-attendance-item-info">{absents} absents + {presents} presents / {sessions} sessions</div>', '</div>'].join(''),
		emptyText : 'There is no attendance data.',
		plugins : [{
			xclass : 'Ext.plugin.PullRefresh',
			refreshFn : function(plugin) {
				var store = plugin.getList().getStore();
				store.load({
					params : {
						id : window.localStorage.getItem("id"),
						pwd : window.localStorage.getItem("pwd")
					}
				});
			}
		}],
		listeners : {
			painted : function(sender, eOpts) {
				target = Ext.getCmp('iu-attendance');

				if (!target.getStore().isLoaded()) {
					target.setMasked({
						xtype : 'loadmask',
						message : 'Loading Attendance'
					});

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
			}
		}
	}
});
