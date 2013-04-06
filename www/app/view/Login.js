Ext.define('IU.view.Login', {
	extend : 'Ext.form.Panel',
	xtype : 'iu-login',
	config : {
		cls : 'iu-login',
		url : BaseURL + '/Login.php',
		submitOnAction : true,
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
			html : '<a href="http://umairashraf.me/">umairashraf.me</a>'
		}]
	}
});
