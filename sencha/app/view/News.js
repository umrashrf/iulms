Ext.define('IU.view.News', {
	extend : 'Ext.List',
	xtype : 'iu-news',
	config : {
		cls : 'iu-news',
		store : 'News',
		grouped: true,
		selectedCls : '',
		loadingText: false,
		itemTpl : ['<div class="iu-list-item">{title}</div>'].join(''),
		emptyText : '"Iqra University - IU" Facebook page has no updates.',
		plugins : [{
			xclass : 'Ext.plugin.PullRefresh',
			refreshFn : function(plugin) {
				var store = plugin.getList().getStore();
				store.load();
			}
		}],
		listeners : {
			painted : function(sender, eOpts) {
				target = Ext.getCmp('iu-news');

				if (!StoreStates['news']) {
					target.getStore().removeAll();

					target.setMasked({
						xtype : 'loadmask',
						message : 'Loading <br>News'
					});

					target.getStore().load({
						callback : function() {
							StoreStates['news'] = true;
							target.setMasked(false);
						}
					});
				}
			}
		}
	}
});
