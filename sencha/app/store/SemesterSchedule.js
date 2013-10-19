Ext.define('IU.store.SemesterSchedule', {
	extend : 'Ext.data.Store',
	config : {
		model : 'IU.model.SemesterSchedule',
		proxy : {
			type : 'ajax',
			url : IU.util.Config.getAbsoluteURL('/schedule'),
			reader : {
				type : 'json'
			}
		}
	}
});
