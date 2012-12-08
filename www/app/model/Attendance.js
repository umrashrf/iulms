Ext.define('IU.model.Attendance', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : 'semester',
			type : 'string'
		}, {
			name : 'course_id',
			type : 'string'
		}, {
			name : 'course_name',
			type : 'string'
		}, {
			name : 'sessions',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'presents',
			type : 'int',
			defaultValue : 0
		}, {
			name : 'absents',
			type : 'int',
			defaultValue : 0
		}]
	}
});
