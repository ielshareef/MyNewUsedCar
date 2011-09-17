Ext.regController('Home', {
	index: function() {
		var btn1 = new Ext.Button({
			text: "I want to sell my used car",
			cls: 'bigbtn',
		});

		var btn2 = new Ext.Button({
			text: "I want to buy a used car",
			cls: 'bigbtn',
		});
		
		if (!this.indexView) {
			this.indexView = this.render({
		   		xtype: 'HomeIndex',
		   	});
			this.indexView.add({
				flex:1,
				layout: 'hbox',
				html: "Welcome to <strong>My <em>New</em> Used Car</strong> where you get to find your next car! Tofdafkdkfsa dsfdsf sdf dsf ",
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
		}
		this.application.viewport.setActiveItem(this.indexView);
	},
});