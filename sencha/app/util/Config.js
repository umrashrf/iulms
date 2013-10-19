Ext.define('IU.util.Config', {
    singleton: true,

    baseURL: '',
    storeStates: {
        'News': false,
        'SemesterSchedule': false,
        'Attendance': false,
        'Transcript': false,
        'About': false
    },

    getBaseURL: function() {
        this.baseURL = '';
        if (document.URL.indexOf("http://") === -1) {
            this.baseURL = 'http://www.iulmsapp.tk';
        }
        return this.baseURL;
    },
    getAbsoluteURL: function(path) {
        return this.getBaseURL() + path;
    },
    getStoreState: function(name) {
        return this.storeStates[name];
    },
    setStoreState: function(name, value) {
        this.storeStates[name] = value;
    }
});