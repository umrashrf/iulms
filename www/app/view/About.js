Ext.define('IU.view.About', {
	extend : 'Ext.Panel',
	xtype : 'iu-about',
	config : {
		cls : 'iu-about',
		layout : 'fit',
		items : [{
			xtype : 'list',
			store : 'About',
			grouped : true,
			selectedCls : '',
			itemTpl : '<div class="iu-box" style="width: 60%;">{name}</div><div class="iu-box iu-text-right" style="width: 40%;">{value}</div>',
			emptyText : 'IULMS returned no profile data.<div>Possible causes can be Teacher Evaluation, Degree Completed, Website Changed or Application Error.</div>',
			plugins : [{
			xclass : 'Ext.plugin.PullRefresh',
				refreshFn : function(plugin) {
					var store = plugin.getList().getStore();
					
					// load profile here
					Ext.Ajax.request({
					    url: BaseURL + '/Profile.php',
					    params : {
							id : window.localStorage.getItem("id"),
							pwd : window.localStorage.getItem("pwd")
						},
					    callback : function(ajax, success, response) {
					    	if (success) {
					    		if (store.getAt(0).get('name').indexOf('Loading') == 0) {
									// rmeove Loading... item
								    store.removeAt(0);
								}

								if (store.getAt(0).get('name') == 'Reg ID') {
									// List already got profile items so delete them first to add them again
								    
								    var profileItems = store.findRecord('group', 'Your Profile');
								    while (profileItems) {
								    	store.remove(profileItems);
								    	profileItems = store.findRecord('group', 'Your Profile');
								    }
								}
					    		
					    		var json = Ext.JSON.decode(response.responseText);
					        	
					    		var items = [{
					    			name : 'Reg ID',
					    			value : json.reg_id,
					    			group : 'Your Profile',
					    			group_index : 0
					    		}, {
					    			name : 'Name',
					    			value : json.first_name + json.last_name,
					    			group : 'Your Profile',
					    			group_index : 0
					    		}, {
					    			name : 'Email',
					    			value : json.email,
					    			group : 'Your Profile',
					    			group_index : 0
					    		}];

					    		store.add(items);

						    	// save changes and reload
						    	store.sync();
						    	store.sort();
					    	}
					    }
					});
				}
			}],
		}],
		listeners : {
			painted : function(sender, eOpts) {
				var target = Ext.getCmp('iu-about').getAt(0);
				
				if (target.getStore().getAt(0).get('name') == 'Loading...') {
					// load profile here
					Ext.Ajax.request({
					    url: BaseURL + '/Profile.php',
					    params : {
							id : window.localStorage.getItem("id"),
							pwd : window.localStorage.getItem("pwd")
						},
					    callback : function(ajax, success, response) {
					    	// rmeove Loading... item
					    	target.getStore().removeAt(0);

					    	if (success) {
					    		var json = Ext.JSON.decode(response.responseText);
					        	
					    		var items = [{
					    			name : 'Reg ID',
					    			value : json.reg_id,
					    			group : 'Your Profile',
					    			group_index : 0
					    		}, {
					    			name : 'Name',
					    			value : json.first_name + json.last_name,
					    			group : 'Your Profile',
					    			group_index : 0
					    		}, {
					    			name : 'Email',
					    			value : json.email,
					    			group : 'Your Profile',
					    			group_index : 0
					    		}];

					    		target.getStore().add(items);
					    	}

					    	// save changes and reload
					    	target.getStore().sync();
					    	target.getStore().sort();
					    }
					});
				}
			}
		}
	}
});