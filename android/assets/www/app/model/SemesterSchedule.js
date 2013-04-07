Ext.define('IU.model.SemesterSchedule', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : 'course_code',
			type : 'string',
			mapping : 'secCourseCode'
		}, {
			name : 'course_id',
			type : 'string',
			mapping : 'courseId'
		}, {
			name : 'course_name',
			type : 'string',
			mapping : 'courseName'
		}, {
			name : 'faculty_name',
			type : 'string',
			mapping : 'facultyName'
		}, {
			name : 'day',
			type : 'string'
		}, {
			name : 'time',
			type : 'string'
		}, {
			name : 'hours',
			type : 'string'
		}, {
			name : 'location',
			type : 'string'
		}, {
			name : 'today',
			type : 'string'
		}, {
			name : 'sessionNo',
			type : 'int'
		}]
	}
});
