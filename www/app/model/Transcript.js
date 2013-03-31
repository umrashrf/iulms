Ext.define('IU.model.Transcript', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : 'course_code',
			mapping : 'crsCode',
			type : 'int'
		}, {
			name : 'course_name',
			mapping : 'crsTitle',
			type : 'string'
		}, {
			name : 'credit_hours',
			mapping : 'crsHours',
			type : 'string'
		}, {
			name : 'grade',
			mapping : 'crsGrade',
			type : 'string'
		}, {
			name : 'semester_no',
			mapping : 'semNo',
			type : 'int'
		}, {
			name : 'semester_name',
			mapping : 'semName',
			type : 'string'
		}, {
			name : 'gpa',
			type : 'string'
		}]
	}
});
