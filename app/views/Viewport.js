// Root view
App.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
});

// Home page view
App.views.HomeIndex = Ext.extend(Ext.Panel, {
    layout: 'vbox',
	pack: 'center',
	cardSwitchAnimation: "fade",
});
Ext.reg('HomeIndex', App.views.HomeIndex);

// List of Makes view
App.views.ListOfMakes = Ext.extend(Ext.Panel, {
	layout: 'fit',
	cardSwitchAnimation: "slide",
});
Ext.reg('ListOfMakes', App.views.ListOfMakes);

// List of Models view
App.views.ListOfModels = Ext.extend(Ext.Panel, {
	layout: 'fit',
	cardSwitchAnimation: "slide",
});
Ext.reg('ListOfModels', App.views.ListOfModels);

// List of Years view
App.views.ListOfYears = Ext.extend(Ext.Panel, {
	layout: 'fit',
	cardSwitchAnimation: "slide",
});
Ext.reg('ListOfYears', App.views.ListOfYears);

// List of Styles view
App.views.ListOfStyles = Ext.extend(Ext.Panel, {
	layout: 'fit',
	cardSwitchAnimation: "slide",
});
Ext.reg('ListOfStyles', App.views.ListOfStyles);

// List of Options view
App.views.ListOfOptions = Ext.extend(Ext.Panel, {
	scroll: "vertical",
	layout: 'card',
	items: []
});
Ext.reg('ListOfOptions', App.views.ListOfOptions);