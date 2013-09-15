Ext.define('IU.store.Transcript', {
	extend : 'Ext.data.Store',
	config : {
		model : 'IU.model.Transcript',
		proxy : {
			type : 'ajax',
			url : BaseURL + '/transcript',
			reader : {
				type : 'json',
				rootProperty : 'attemptedCourses'
			}
		},
		grouper : {
			groupFn : function(record) {
				if(record && record.data.semester_name) {
					return record.get('semester_name');
				} else {
					return '';
				}
			},
			sortProperty: 'semester_no'
		}
	}
});