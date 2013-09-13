/**
 * Application Config
 */
var BaseURL;
BaseURL = "http://192.168.1.7:81/service";
BaseURL = "";

// to override service path on iOS, Android etc
if (document.URL.indexOf("http://") === -1) {
	BaseURL = "http://umairashraf.me/testing/IU/v2.0/service";
}

/**
 * For console that can't suck errors
*/
/*
window.onerror = function(msg, url, line) {
	console.log('IU Log: ' + line + ": " + msg);
};
*/

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
	models : ['News', 'SemesterSchedule', 'Attendance', 'Transcript'],
	stores : ['News', 'SemesterSchedule', 'Attendance', 'Transcript', 'About'],
	views : ['Main', 'Login', 'Tabs', 'News', 'SemesterSchedule', 'Attendance', 'Transcript', 'About'],
	controllers : ['Main', 'Transcript'],

	launch : function() {
		Ext.create('IU.view.Main', {
			id : 'iu-main',
			fullscreen : true
		});
	}
});