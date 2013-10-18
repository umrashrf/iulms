Ext.define('IU.view.SemesterSchedule', {
	extend : 'Ext.List',
	xtype : 'iu-semesterschedule',
	config : {
		cls : 'iu-semesterschedule',
		layout : 'fit',
		store : 'SemesterSchedule',
		selectedCls : '',
		loadingText: false,
		itemTpl : ['<div>', '<div class="iu-list-item">{course_name} <small>by {faculty_name}</small></div>', '<div class="iu-list-sub-item">{time} on {day}</div>', '</div>'].join(''),
		emptyText : 'IULMS returned no semester schedule data.<div>Possible causes can be Teacher Evaluation, Degree Completed, Website Changed or Application Error.</div>',
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
				target = Ext.getCmp('iu-semesterschedule');

				if (!target.getStore().isLoaded()) {
					target.setMasked({
						xtype : 'loadmask',
						message : 'Loading Schedule'
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
