Ext.define('IU.view.Attendance', {
	extend : 'Ext.List',
	xtype : 'iu-attendance',
	config : {
		cls : 'iu-attendance',
		layout : 'fit',
		store : 'Attendance',
		grouped : true,
		selectedCls : '',
		loadingText: false,
		itemTpl : ['<div>', '<div class="iu-list-item">{course_name}</div>', '<div class="iu-list-sub-item">{absents} absents + {presents} presents / {sessions} sessions</div>', '</div>'].join(''),
		emptyText : 'IULMS returned no attendance data.<div>Possible causes can be Teacher Evaluation, Degree Completed, Website Changed or Application Error.</div>',
		plugins : [{
			xclass : 'Ext.plugin.PullRefresh',
			fetchLatest : function() {
				var store = this.getList().getStore();
				store.load({
					params : {
						id : window.localStorage.getItem("id"),
						pwd : window.localStorage.getItem("pwd")
					}
				});

				// Call the two functions
				this.setState("loaded");
				if (this.getAutoSnapBack()) {
					this.snapBack();
				}
			}
		}],
		listeners : {
			painted : function(sender, eOpts) {
				var task  =Ext.create('Ext.util.DelayedTask', function() {
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
				});
				task.delay(250);
			}
		}
	}
});
