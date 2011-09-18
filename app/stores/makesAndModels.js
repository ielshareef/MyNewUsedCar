Ext.regModel('MakeList', {
	fields: ['name', 'niceName', 'id', 'link']
});
App.stores.getMakes = new Ext.data.Store({
    model: 'MakeList',
    proxy: {
		type: 'ajax', 
		url: '/MyNewUsedCar/server/getMakes.php',
        reader: {
            type: 'json',
            root: 'makes',
        }
    },
});

Ext.regModel('ModelList', {
	fields: ['name', 'niceName', 'id', 'link', 'submodel', 'mode', 'modelname', 'years']
});
App.stores.getModels = new Ext.data.Store({
    model: 'ModelList',
    proxy: {
		type: 'ajax', 
		url: '/MyNewUsedCar/server/getModels.php',
        reader: {
            type: 'json',
            root: 'models',
        }
    },
});

Ext.regModel('YearList', {
	fields: ['year']
});
App.stores.getYears = new Ext.data.Store({
	model: 'YearList',
});

Ext.regModel('StyleList', {
	fields: ['name', 'link', 'id', 'publicationState']
});
App.stores.getStyles = new Ext.data.Store({
    model: 'StyleList',
    proxy: {
		type: 'ajax', 
		url: '/MyNewUsedCar/server/getStyles.php',
        reader: {
            type: 'json',
            root: 'styles',
        }
    },
});