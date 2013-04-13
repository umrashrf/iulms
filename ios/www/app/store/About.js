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
		}, {
			name : 'Name',
			value : 'IQRA University (IU)',
			group : 'App Info',
			group_index : 1
		}, {
			name : 'Version',
			value : '2.0',
			group : 'App Info',
			group_index : 1
		}, {
			name : 'Founded Year',
			value : '2011',
			group : 'App Info',
			group_index : 1
		}, {
			name : 'Name',
			value : 'Umair Ashraf',
			group : 'Developer Info',
			group_index : 2
		}, {
			name : 'Website',
			value : 'http://umairashraf.me/',
			group : 'Developer Info',
			group_index : 2
		}]
	}
});
