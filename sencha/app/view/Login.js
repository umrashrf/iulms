Ext.define('IU.view.Login', {
	extend : 'Ext.form.Panel',
	xtype : 'iu-login',
	config : {
		cls : 'iu-login',
		url : BaseURL + '/login',
		submitOnAction : true,
		standardSubmit : false,
		items : [{
			xtype : 'fieldset',
			title : 'Type your IULMS credentials',
			items : [{
				xtype : 'textfield',
				name : 'id',
				placeHolder : 'Reg. No'
			}, {
				xtype : 'passwordfield',
				name : 'pwd',
				placeHolder : 'Password'
			}]
		}, {
			xtype : 'panel',
			cls : 'credits',
			html : '<a href="http://umairashraf.me/" target="_blank">umairashraf.me</a>'
		}],
		// need to move this to Main.js controller. It's a hack for ST bug
		listeners : {
			order : 'before',
			beforesubmit : function(sender, values, options, eOpts) {
				// check if it's right and return
				if(values.id.replace(/ /g, "").length <= 0) {
					Ext.Msg.alert("Oops!", "Reg. No. is required.", Ext.emptyFn);
					return false;
				}

				if(values.pwd.replace(/ /g, "").length <= 0) {
					Ext.Msg.alert("Oops!", "Password is required.", Ext.emptyFn);
					return false;
				}

				sender.setMasked({
					xtype : 'loadmask',
					message : 'Logging In...'
				});
			}
		}
	}
});
