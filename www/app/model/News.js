Ext.define('IU.model.News', {
	extend : 'Ext.data.Model',
	config : {
		fields : [{
			name : 'id',
			type : 'string'
		}, {
			name : 'title',
			type : 'string'
		}, {
			name : 'link',
			type : 'string'
		}, {
			name : 'published',
			type : 'string'
		}, {
			name : 'updated',
			type : 'string'
		}, {
			name : 'content',
			type : 'string'
		}]
	}
});