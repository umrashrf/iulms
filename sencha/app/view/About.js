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
			loadingText: false,
			itemTpl : '<div class="iu-box" style="width: 30%;">{name}</div><div class="iu-box iu-text-right" style="width: 70%;">{value}</div>',
			emptyText : 'IULMS returned no profile data.<div>Possible causes can be Teacher Evaluation, Degree Completed, Website Changed or Application Error.</div>',
			plugins : [{
				xclass : 'Ext.plugin.PullRefresh',
				fetchLatest : function() {
					target = this.getList();
					target.refresh();

					// load profile here
					Ext.Ajax.request({
					    url: IU.util.Config.getAbsoluteURL('/profile'),
					    params : {
							id : window.localStorage.getItem("id"),
							pwd : window.localStorage.getItem("pwd")
						},
					    callback : function(ajax, success, response) {
					    	target.getStore().removeAll();

					    	if (success) {
					    		var json = Ext.JSON.decode(response.responseText);

					    		if (json.last_name.length > 0) {
					    			json.last_name = ' ' + json.last_name
					    		}

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
					    		}, {
									name : 'Name',
									value : 'IQRA University (IU)',
									group : 'App Info',
									group_index : 1
								}, {
									name : 'Version',
									value : '2.0',
									group : 'App Info',
									group_index : 1
								}, {
									name : 'Founded Year',
									value : '2011',
									group : 'App Info',
									group_index : 1
								}, {
									name : 'Name',
									value : 'Umair Ashraf',
									group : 'Developer Info',
									group_index : 2
								}, {
									name : 'Website',
									value : 'http://umairashraf.me/',
									group : 'Developer Info',
									group_index : 2
								}];

					    		target.getStore().add(items);

						    	// save changes and reload
						    	target.getStore().sync();
						    	target.getStore().sort();
					    	}
					    }
					});

					// Call the two functions
					this.setState("loaded");
					if (this.getAutoSnapBack()) {
						this.snapBack();
					}
				}
			}]
		}],
		listeners : {
			painted : function(sender, eOpts) {
				setTimeout(function() {
					var target = Ext.getCmp('iu-about').getAt(0);

					if (!IU.util.Config.getStoreState('About')) {
						// load profile here
						Ext.Ajax.request({
						    url: IU.util.Config.getAbsoluteURL('/profile'),
						    params : {
								id : window.localStorage.getItem("id"),
								pwd : window.localStorage.getItem("pwd")
							},
						    callback : function(ajax, success, response) {
						    	target.getStore().removeAll();

						    	if (success) {
						    		var json = Ext.JSON.decode(response.responseText);

						    		if (json.last_name.length > 0) {
						    			json.last_name = ' ' + json.last_name
						    		}

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
						    		}, {
										name : 'Name',
										value : 'IQRA University (IU)',
										group : 'App Info',
										group_index : 1
									}, {
										name : 'Version',
										value : '2.0',
										group : 'App Info',
										group_index : 1
									}, {
										name : 'Founded Year',
										value : '2011',
										group : 'App Info',
										group_index : 1
									}, {
										name : 'Name',
										value : 'Umair Ashraf',
										group : 'Developer Info',
										group_index : 2
									}, {
										name : 'Website',
										value : 'http://umairashraf.me/',
										group : 'Developer Info',
										group_index : 2
									}];

						    		target.getStore().add(items);

						    		IU.util.Config.setStoreState('About', true);
						    	}

						    	// save changes and reload
						    	target.getStore().sync();
						    	target.getStore().sort();
						    }
						});
					}
				}, 100);
			}
		}
	}
});