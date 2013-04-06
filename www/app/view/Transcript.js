Ext.define('IU.view.Transcript', {
	extend : 'Ext.Panel',
	xtype : 'iu-transcript',
	requires : ['IU.store.Transcript'],
	config : {
		cls : 'iu-transcript',
		layout : 'fit',
		items : [{
			xtype : 'toolbar',
			docked : 'bottom',
			layout : {
				type : 'hbox',
				align : 'center',
				pack : 'center'
			},
			defaults : {
				flex : 1
			},
			items : [{
				xtype : 'panel',
				html : 'CGPA: '
			}, {
				xtype : 'panel',
				html : 'Credit Hours: '
			}]
		}, {
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
				painted : function(sender, eOpts) {
					target = Ext.getCmp('iu-transcript').getAt(1);

					if (!target.getStore().isLoaded()) {
						target.setMasked({
							xtype : 'loadmask',
							message : 'Loading Transcript'
						});

						target.getStore().load({
							params : {
								id : window.localStorage.getItem("id"),
								pwd : window.localStorage.getItem("pwd")
							},
							callback : function(records, operation, success) {
								console.log(IU);
								
								transcript = Ext.JSON.decode(operation.getResponse().responseText, true);
								
								transcript.cgpa

								target.setMasked(false);	
							}
						});	
					}
				}
			}
		}]
	}
});
