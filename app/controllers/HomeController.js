Ext.regController('Home', {
	index: function() {
		// Create buttons to show on the home screen
		var btn1 = new Ext.Button({
			text: "I want to sell my used car",
			cls: 'bigbtn',
			handler: function() {
				Ext.dispatch({
				    controller: 'Home',
				    action    : 'listOfMakes',
				    historyUrl: 'home/listOfMakes',
				});
			},
		});

		var btn2 = new Ext.Button({
			text: "I want to buy a used car",
			cls: 'bigbtn',
		});
		
		// Set up the first view
		if (!this.indexView) {
			this.indexView = this.render({
		   		xtype: 'HomeIndex',
		   	});
			this.indexView.add({
				flex:1,
				layout: 'hbox',
				html: "Welcome to <strong>My <em>New</em> Used Car</strong>!<p>You can post your call for sale or find a used car nearby.</p>",
				styleHtmlContent: true,
			});
			this.indexView.add({
				flex:1,
				layout: 'hbox',
				items: [btn1],
			});
			this.indexView.add({
				flex:1,
				layout: 'hbox', 
				items: [btn2],
			});
			this.indexView.addDocked({
				xtype: 'toolbar',
			    title: 'My New Used Car',
				dock: "top"
			})
		}
		this.application.loading.hide();
		// Activate the view
		this.application.viewport.setActiveItem(this.indexView);
	},
	listOfMakes: function() {
		if (!this.listOfMakesView) {
			this.listOfMakesView = this.render({
		   		xtype: 'ListOfMakes',
		   	});
			var lst = {
				xtype: 'list',
				scroll: 'vertical',
				itemTpl: "{name}",
				store: App.stores.getMakes,
				loadingText: 'Fetching makes ...',
				listeners: {
					itemtap: function(list, index, el, evt) {
						setTimeout(function(){list.deselect(index);},500);
						Ext.dispatch({
							controller: 'Home',
							action: "listOfModels",
							historyUrl: 'home/listOfModels',
							id: list.store.getAt(index).data.niceName,
							make: list.store.getAt(index).data.name
						})
					}
				}
			};
			this.listOfMakesView.add(lst);
			var app = this.application;
			this.listOfMakesView.addDocked({
				xtype: 'toolbar',
			    title: 'Makes',
				dock: "top",
				items: [{
					ui: 'back',
					text: 'Back',
					handler: function() {
						app.viewport.setActiveItem(0, {type: "slide", direction: "right"});
					}
				}]
			});
			App.stores.getMakes.load();
		}
		// Activate the view
		this.application.viewport.setActiveItem(this.listOfMakesView);
	},
	listOfModels: function(options) {
			this.listOfModelsView = this.render({
		   		xtype: 'ListOfModels',
		   	});
			var lst = {
				xtype: 'list',
				scroll: 'vertical',
				itemTpl: "{name}",
				store: App.stores.getModels,
				loadingText: 'Fetching models ...',
				listeners: {
					itemtap: function(list, index, el, evt) {
						setTimeout(function(){list.deselect(index);},500);
						Ext.dispatch({
							controller: 'Home',
							action: "listOfYears",
							historyUrl: 'home/listOfYear',
							id: list.store.getAt(index).data.model,
							model: list.store.getAt(index).data.name,
							make: options.make,
							makeid: options.id,
							dat: list.store.getAt(index).data,
						})
					}
				}
			};
			this.listOfModelsView.add(lst);
			var app = this.application;
			this.listOfModelsView.addDocked({
				xtype: 'toolbar',
			    title: options.make,
				dock: "top",
				items: [{
					ui: 'back',
					text: 'Makes',
					handler: function() {
						app.viewport.setActiveItem(1, {type: "slide", direction: "right"});
					}
				}]
			});
		App.stores.getModels.load({
			params: {make: options.id}
		});
		// Activate the view
		this.application.viewport.setActiveItem(this.listOfModelsView);
	},
	listOfYears: function(options) {
			this.listOfYearsView = this.render({
		   		xtype: 'ListOfYears',
		   	});
			var lst = {
				xtype: 'list',
				scroll: 'vertical',
				itemTpl: "{year}",
				store: App.stores.getYears,
				loadingText: 'Fetching Years ...',
				listeners: {
					itemtap: function(list, index, el, evt) {
						setTimeout(function(){list.deselect(index);},500);
						Ext.dispatch({
							controller: 'Home',
							action: "listOfStyles",
							historyUrl: 'home/listOfStyles',
							year: list.store.getAt(index).data.year,
							dat: options
						})
					}
				}
			};
			this.listOfYearsView.add(lst);
			var app = this.application;
			this.listOfYearsView.addDocked({
				xtype: 'toolbar',
			    title: options.make+' '+options.model,
				dock: "top",
				items: [{
					ui: 'back',
					text: "Back",
					handler: function() {
						app.viewport.setActiveItem(2, {type: "slide", direction: "right"});
					}
				}]
			});
		App.stores.getYears.loadData(options.dat.years, false);
		// Activate the view
		this.application.viewport.setActiveItem(this.listOfYearsView);
	},
	listOfStyles: function(options) {
		var vehicle = {
			year: options.year,
			make: options.dat.makeid,
			model: options.dat.dat.modelname,
			displayMake: options.dat.make,
			displayModel: options.dat.model
		};
		this.listOfStylesView = this.render({
	   		xtype: 'ListOfStyles',
	   	});
		var lst = {
			xtype: 'list',
			scroll: 'vertical',
			itemTpl: "{name}",
			store: App.stores.getStyles,
			loadingText: 'Fetching styles ...',
			listeners: {
				itemtap: function(list, index, el, evt) {
					setTimeout(function(){list.deselect(index);},500);
					Ext.dispatch({
						controller: 'Home',
						action: "listOfYears",
						historyUrl: 'home/listOfYear',
						id: list.store.getAt(index).data.model,
						model: list.store.getAt(index).data.name,
						make: options.make,
						makeid: options.id,
						dat: list.store.getAt(index).data,
					})
				}
			}
		};
		this.listOfStylesView.add(lst);
		var app = this.application;
		this.listOfStylesView.addDocked({
			xtype: 'toolbar',
		    title: vehicle.year+' '+vehicle.displayMake+' '+vehicle.displayModel,
			dock: "top",
			items: [{
				ui: 'back',
				text: 'Back',
				handler: function() {
					app.viewport.setActiveItem(3, {type: "slide", direction: "right"});
				}
			}]
		});
		App.stores.getStyles.load({
			params: {make: vehicle.make, model: vehicle.model.replace(/\s/, '-'), year: vehicle.year}
		});
		// Activate the view
		this.application.viewport.setActiveItem(this.listOfStylesView);
	},
});