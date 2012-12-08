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
			activate : function() {
				this.getStore().load({
					params : {
						id : window.localStorage.getItem("id"),
						pwd : window.localStorage.getItem("pwd")
					}
				});
			}
		}
	}
});
