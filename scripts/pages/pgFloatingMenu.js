/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgFloatingMenuDesign = require('ui/ui_pgFloatingMenu');
const FloatingMenu = require('sf-core/ui/floatingmenu');
const Color = require("sf-core/ui/color");

const PgFloatingMenu = extend(PgFloatingMenuDesign)(
	// Constructor
	function(_super) {
		// Initalizes super class for this page scope
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
	superOnShow();
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
	var page = this;

	var items = [
		new FloatingMenu.Item({
			title: "red",
			color: Color.RED,
			onClick: function() {
				console.log("clicked: RED");
			}
		}),
		new FloatingMenu.Item({
			title: "yellow",
			titleColor: Color.YELLOW,
			color: Color.YELLOW,
			onClick: function() {
				console.log("clicked: YELLOW");
			}
		}),
		new FloatingMenu.Item({
			title: "default",
			onClick: function() {
				console.log("clicked: DEFAULT");
			}
		})
	];

	var floatingMenu = new FloatingMenu({
		items: items,
		onMenuOpen: function() {
			console.log("open items");
		},
		onMenuClose: function() {
			console.log("close items");
		},
		color: Color.GREEN,
		onClick: function() {
			console.log("Regular click");
		}
	});
	page.layout.addChild(floatingMenu);
}

module && (module.exports = PgFloatingMenu);
