Ext.define('IU.store.Attendance', {
	extend : 'Ext.data.Store',
	config : {
		model : 'IU.model.Attendance',
		proxy : {
			type : 'ajax',
			url : BaseURL + '/attendance',
			reader : {
				type : 'json'
			}
		},
		grouper : {
			groupFn : function(record) {
				if(record && record.data.semester) {
					return record.get('semester');
				} else {
					return '';
				}
			}
		}
	}
});
