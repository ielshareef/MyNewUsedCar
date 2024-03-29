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
		this.vehicle = {
			year: options.year,
			make: options.dat.makeid,
			model: options.dat.dat.modelname,
			displayMake: options.dat.make,
			displayModel: options.dat.model
		};
		this.listOfStylesView = this.render({
	   		xtype: 'ListOfStyles',
	   	});
		var app = this.application;
		var lst = {
			xtype: 'list',
			scroll: 'vertical',
			itemTpl: "{name}",
			store: App.stores.getStyles,
			loadingText: 'Fetching styles ...',
			listeners: {
				itemtap: function(list, index, el, evt) {
					setTimeout(function(){list.deselect(index);},500);
					app.vehicle['styleid'] = list.store.getAt(index).data.id;
					app.vehicle['style'] = list.store.getAt(index).data.name
					Ext.dispatch({
						controller: 'Home',
						action: "listOfOptions",
						historyUrl: 'home/listOfOptions',
					})
				}
			}
		};
		this.listOfStylesView.add(lst);
		var app = this.application;
		this.listOfStylesView.addDocked({
			xtype: 'toolbar',
		    title: this.vehicle.year+' '+ this.vehicle.displayMake+' '+ this.vehicle.displayModel,
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
			params: {make: this.vehicle.make, model: this.vehicle.model.replace(/\s/, '-'), year: this.vehicle.year}
		});
		// Save the vehicle object in global
		this.application.vehicle = this.vehicle;
		// Activate the view
		this.application.viewport.setActiveItem(this.listOfStylesView);
	},
	listOfOptions: function(options) {
		this.application.loading.show();
		this.listOfOptionsView = this.render({
	   		xtype: 'ListOfOptions',
	   	});
		var app = this.application;
		this.listOfOptionsView.addDocked({
			xtype: 'toolbar',
		    title: "Car Details",
			dock: "top",
			items: [{
				ui: 'back',
				text: 'Back',
				handler: function() {
					app.viewport.setActiveItem(4, {type: "slide", direction: "right"});
				}
			}]
		});
		var styleid = this.application.vehicle.styleid;
		var panel = this.listOfOptionsView;
		panel.getDockedItems()[0].add({
			xtype: 'spacer'
		}, {
			ui: 'action',
			text: "What's My TMV!",
			handler: function() {
				var val = Ext.getCmp('detailForm').getValues();
				if (!val.mileage) {
					alert('Please enter the mileage of your car');
				} else {
					Ext.dispatch({
						controller: 'Home',
						action: "tmv",
						historyUrl: 'home/tmv',
						opt: val,
					});
				}
			}
		});
		panel.add({
			title: "Details",
			xtype: "form",
			id: "detailForm",
			scroll: "vertical",
			items: [{
				xtype: "fieldset",
				title: "Car Info",
				instructions: "Please eter the information above",
				defaults: {
					labelWidth: '35%'
				},
				items: [{
					xtype: "hiddenfield",
					name: "styleid",
					value: this.application.vehicle.styleid,
				}, {
					xtype: "textfield",
					name: "vehicle",
					value: this.application.vehicle.year+' '+this.application.vehicle.displayMake+' ' + this.application.vehicle.displayModel + ' ' + this.application.vehicle.style,
					label: "Vehicle",
					disabled: true,
					userClearIcon: true
				}, {
					xtype: "textfield",
					name: "vin",
					label: "VIN",
					cls: "vin",
					placeHolder: "e.g. YT3254DFS85TF42RV",
					userClearIcon: true
				}, {
					xtype: "textfield",
					name: "mileage",
					label: "Milage",
					placeHolder: "e.g. 15000",
					userClearIcon: true,
					required: true
				}, {
					xtype: "selectfield",
					name: "condition",
					label: "Condition",
					modal: true,
					options: [
						{text: "Outstanding",  value: "Outstanding"},
						{text: "Clean",  value: "Clean"},
						{text: "Average",  value: "Average"},
						{text: "Rough",  value: "Rough"},
						{text: "Poor",  value: "Poor"}
					],
					userClearIcon: true,
					required: true
				}]
			}]
		});
		var getOptions = function() {
            Ext.util.JSONP.request({
				url: '/MyNewUsedCar/server/getConfig.php',
				params: {
					styleid: styleid,
				},
				callbackKey: 'callback',
				callback: function(data) {
					if (data.color) {
						var colorObj = {
							xtype: "fieldset",
							title: "Colors",
							instructions: "Please select the color of your car",
							defaults: {
								xtype: 'radiofield',
								labelWidth: '35%'
							},
							items: []
						};
						for (var i=0; i<data.color.length; i++) {
							colorObj.items.push({
								name: 'color',
								label: data.color[i].name+' ('+data.color[i].type.toLowerCase()+')',
								value: data.color[i].id
							})
						}
						panel.getComponent(0).add(colorObj);
					}
					if (data.option) {
						var optionObj = {
							xtype: "fieldset",
							title: "Options",
							instructions: "Please select from the options above.",
							defaults: {
								xtype: 'checkboxfield',
								labelWidth: '35%'
							},
							items: []
						};
						for (var i=0; i<data.option.length; i++) {
							optionObj.items.push({
								name: 'option',
								label: data.option[i].name,
								value: data.option[i].id
							})
						}
						panel.getComponent(0).add(optionObj);
					}
					app.loading.hide();
					app.viewport.setActiveItem(panel);
				}
			});
		};
		getOptions();
		// Activate the view
		//this.application.viewport.setActiveItem(this.listOfOptionsView);
	},
	tmv: function(options) {
		this.application.loading.show();
		this.tmv = this.render({
	   		xtype: 'TMV',
	   	});
		this.tmv.addDocked({
			xtype: 'toolbar',
		    title: "Your Cars Value",
			dock: "top",
			items: [{
				ui: 'back',
				text: 'Back',
				handler: function() {
					app.viewport.setActiveItem(5, {type: "slide", direction: "right"});
				}
			}]
		});
		var panel = this.tmv;
		var app = this.application;
		var price, zipcode, lat, lng;
		panel.getDockedItems()[0].add({
			xtype: 'spacer'
		}, {
			ui: 'action',
			text: "Post it!",
			handler: function() {
				//alert('Dude! Maybe next week!');
				Ext.dispatch({
					controller: 'Home',
					action: "carMap",
					historyUrl: 'home/carMap',
					opt: options.opt,
					tmv: price,
					zip: zipcode,
					lat: lat,
					lng: lng
				});
			}
		})
		function startIt(pos) {
			lat = pos.coords.latitude;
			lng = pos.coords.longitude;
			var getTmv = function() {
				var opts = options.opt.option
				var opts_str = '';
				for (var i=0; i < opts.length; i++) {
					opts_str +='optionsid[]='+opts[i];
				}
	            Ext.util.JSONP.request({
					url: '/MyNewUsedCar/server/getTmv.php',
					params: {
						id: options.opt.styleid,
						colorid: options.opt.color,
						cond: options.opt.condition,
						mil: options.opt.mileage,
						lat: lat,
						lng: lng
					},
					callbackKey: 'callback',
					callback: function(data) {
						price = data.price;
						zipcode = data.zip;
						panel.add({
							flex:1,
							layout: 'hbox',
							styleHtmlContent: true,
							cls: 'tmv',
							html: 'You should expect to get about <strong>$'+data.price+'</strong> for your '+app.vehicle.year+' '+app.vehicle.displayMake+ ' ' + app.vehicle.displayModel + ' ' + app.vehicle.style + ' in your zipcode of <strong>'+data.zip+'</strong>. If you want to put it up for sale, click on the button above to get the ball rolling!',
						});
						app.loading.hide();
						app.viewport.setActiveItem(panel);
					}
				});
			};
			getTmv();
		}
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				if(pos) {
					startIt(pos);
				} else {
					startIt({coords:{latitude: "34.0039", longitude: "-118.4338"}});
				}
			});		
		} else {
			startIt({coords:{latitude: "34.0039", longitude: "-118.4338"}});
		}
	},
	carMap: function(options) {
		console.log(options);
		this.carMap = this.render({
	   		xtype: 'CarMap',
	   	});
		this.carMap.addDocked({
			xtype: 'toolbar',
		    title: "Your Online!",
			dock: "top",
			items: [{
				ui: 'back',
				text: 'Add More Cars',
				handler: function() {
					app.viewport.setActiveItem(0, {type: "slide", direction: "right"});
				}
			}]
		});
		var panel = this.carMap;
		var app = this.application;
		var marker;
		var mapPanel = new Ext.Map({
			title: 'Map',
			useCurrentLocation: true,
			mapOptions: {
				zoom: 12
			},
			listeners: {
				el: {
			    	click: function() {
			        	bble.setContent(app.vehicle.year+' '+app.vehicle.displayMake+' '+app.vehicle.displayModel + ' ' + app.vehicle.style + ' is for sale for <b>$'+options.tmv + '</b> or best offer. Tweet <a href="http://twitter.com/ielshareef" target="_blank">@ielshareef</a> for more info.');
						bble.open(mapPanel.map, marker);
			     	}
			   	}
			}
		});
		panel.add(mapPanel); 
		var bble = new google.maps.InfoWindow();
		var addMarker = function(opt) {
			var latLng = new google.maps.LatLng(opt.lat, opt.lng);
			marker = new google.maps.Marker({
				map: mapPanel.map,
				position: latLng
			});
			
		};
		function refresh() {
			addMarker(options);
		}
		mapPanel.geo.on('update', refresh);
		this.application.viewport.setActiveItem(this.carMap);
	}
});