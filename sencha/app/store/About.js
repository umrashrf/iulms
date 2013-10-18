Ext.define('IU.store.About', {
	extend : 'Ext.data.Store',
	config : {
		grouper : {
			sortProperty: 'group_index',
			groupFn : function(record) {
				return record.get('group');
			}
		},
		data : [{
			name : 'Loading...',
			value : '<div class="iu-spinner"><div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div></div>',
			group : 'Your Profile',
			group_index : 0
		}]
	}
});
