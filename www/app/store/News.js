Ext.define('IU.store.News', {
	extend : 'Ext.data.Store',
	config : {
		model : 'IU.model.News',
		proxy : {
			type : 'ajax',
			url : BaseURL + '/News.php',
			reader : {
				type : 'xml',
				record : 'entry',
				rootProperty : 'feed'
			}
		},
		filters : [{
			filterFn: function(item) {
		        return item.data.title.length > 1;
		    }
		}]
	}
});
