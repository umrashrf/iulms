Ext.define('IU.view.Transcript', {
	extend : 'Ext.Panel',
	xtype : 'iu-transcript',
	requires : ['IU.store.Transcript'],
	config : {
		cls : 'iu-transcript',
		layout : 'fit',
		items : [{
			xtype : 'list',
			store : 'Transcript',
			grouped : true,
			selectedCls : '',
			itemTpl : ['<div>', '<div class="iu-transcript-item-course">{course_name}</div>', '<div class="iu-transcript-item-grade">Grade: {grade}, GPA: {gpa}</div>', '</div>'].join(''),
			emptyText : 'You have no transcript.',
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
		}]
	}
});
