Ext.define('IU.view.Transcript', {
	extend : 'Ext.Panel',
	xtype : 'iu-transcript',
	requires : ['IU.store.Transcript'],
	config : {
		cls : 'iu-transcript',
		layout : 'fit',
		items : [{
			cls : 'iu-transcript-toolbar',
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
				cls : 'iu-transcript-cgpa',
				html : 'CGPA: '
			}, {
				xtype : 'panel',
				cls : 'iu-transcript-hours',
				html : 'Credit Hours: '
			}]
		}, {
			xtype : 'list',
			store : 'Transcript',
			grouped : true,
			selectedCls : '',
			loadingText: false,
			itemTpl : ['<div>', '<div class="iu-list-item">{course_name}</div>', '<div class="iu-list-sub-item">Grade: {grade}, GPA: {gpa}</div>', '</div>'].join(''),
			emptyText : 'IULMS returned no transcript data.<div>Possible causes can be Teacher Evaluation, Degree Completed, Website Changed or Application Error.</div>',
			plugins : [{
				xclass : 'Ext.plugin.PullRefresh',
				refreshFn : function(plugin) {
					var store = plugin.getList().getStore();
					store.load({
						params : {
							id : window.localStorage.getItem("id"),
							pwd : window.localStorage.getItem("pwd")
						},
						callback : function(records, operation, success) {
							var transcript = Ext.JSON.decode(operation.getResponse().responseText, true);

							var toolbar = Ext.getCmp('iu-transcript').getAt(0);
							toolbar.getAt(0).setHtml('CGPA: <b>' + (transcript.cgpa || '0.0') + '</b>');
							toolbar.getAt(1).setHtml('Credit Hours: <b>' + (transcript.hours || 0) + '</b>');

							target.setMasked(false);
						}
					});
				}
			}],
			listeners : {
				painted : function(sender, eOpts) {
					var toolbar = Ext.getCmp('iu-transcript').getAt(0);
					var target = Ext.getCmp('iu-transcript').getAt(1);

					if (!StoreStates['transcript']) {
						target.getStore().removeAll();

						target.setMasked({
							xtype : 'loadmask',
							message : 'Loading <br>Transcript'
						});

						target.getStore().load({
							params : {
								id : window.localStorage.getItem("id"),
								pwd : window.localStorage.getItem("pwd")
							},
							callback : function(records, operation, success) {
								var transcript = Ext.JSON.decode(operation.getResponse().responseText, true);

								toolbar.getAt(0).setHtml('CGPA: <b>' + (transcript.cgpa || '0.0') + '</b>');
								toolbar.getAt(1).setHtml('Credit Hours: <b>' + (transcript.hours || 0) + '</b>');

								StoreStates['transcript'] = true;
								target.setMasked(false);
							}
						});
					}
				}
			}
		}]
	}
});
