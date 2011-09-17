Ext.regApplication({
	name: 'App',
	phoneStartupScreen: 'res/images/iphone.png',
	icon: 'res/images/icon.png',
    glossOnIcon: true,
	defaultUrl: 'Home/index',
    launch: function() {
        this.viewport = new App.views.Viewport();
    }
});