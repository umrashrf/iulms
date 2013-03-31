Ext.define('IU.view.Login', {
	extend : 'Ext.form.Panel',
	xtype : 'iu-login',
	config : {
		url : BaseURL + '/login.php',
		cls : 'iu-login',
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
			xtype : 'button',
			text : 'Login',
			handler : function() {
				this.up('formpanel').submit();
			}
		}, {
			xtype : 'panel',
			cls : 'credits',
			html : '<a href="http://umairashraf.me/">umairashraf.me</a>'
		}]
	}
});
