App.views.HomeIndex = Ext.extend(Ext.Panel, {
    layout: 'vbox',
	pack: 'center',
	cardSwitchAnimation: "fade",
});
Ext.reg('HomeIndex', App.views.HomeIndex);