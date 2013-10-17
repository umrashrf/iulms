Ext.define('IU.store.News', {
	extend : 'Ext.data.Store',
	config : {
		model : 'IU.model.News',
		proxy : {
			type : 'ajax',
			url : BaseURL + '/news',
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
		}],
		grouper: {
			groupFn: function(record) {
				if(record && record.data.published) {
					return moment(record.get('published')).fromNow();
				} else {
					return '';
				}
			},
			sorterFn: function(record1, record2) {
				var d1 = new Date(record1.get('published').split('T')[0]);
				var d2 = new Date(record2.get('published').split('T')[0]);
				return d1 < d2 ? 1 : (d1 == d2 ? 0 : -1);
			}
		}
	}
});
