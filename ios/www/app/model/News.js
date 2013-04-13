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
			type : 'string',
			convert : function getName(v, record) {
			    var nodes = record.raw.childNodes;
			    for (var i = 0; i < nodes.length; i++) {
			        var node = nodes[i];
			        if (node.nodeName == 'link') {
			            var attributes = node.attributes;
			            for (var a = 0; a < attributes.length; a++) {
			                var attribute = attributes[a];
			                if (attribute.name == 'href')
			                    return attribute.value;
			            }
			        }
			    }
			    return null;
			}
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