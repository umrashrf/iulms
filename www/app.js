/**
 * Application Config
 */
var BaseURL;
BaseURL = "http://umairashraf.me/testing/IU/v1.3/service";
BaseURL = "../service";

/**
 * For console that can't suck errors
 */
/*
window.onerror = function(msg, url, line) {
console.log(line + ": " + msg);
};*/

/**
 * Sencha Touch 2 loader cofiguration to auto load views, models, stores, profiles and controllers
 */
Ext.Loader.setConfig({
	enabled : true
});

/**
 * Sencha Touch application instance
 */
Ext.application({
	name : 'IU',
	models : ['Attendance', 'Transcript', 'News'],
	stores : ['Attendance', 'Transcript', 'News'],
	views : ['Main', 'Login', 'Tabs', 'Attendance', 'Transcript', 'News'],
	controllers : ['Main', 'Transcript'],

	launch : function() {
		Ext.create('IU.view.Main', {
			id : 'iu-main',
			fullscreen : true
		});
	}
});
