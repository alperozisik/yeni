const url = "https://preview.c9users.io/alperozisik/fusioncharts/link.html";
const extend = require('js-base/core/extend');
const PgWebViewDesign = require('ui/ui_pgWebView');
const js1 = `window.alper = 'alper';`;
const js2 = `//window.location = "http://www.google.com";`;
const PgWebView = extend(PgWebViewDesign)(
	// Constructor
	function(_super) {
		var page = this;
		// Initalizes super class for this page scope
		_super(this);
		// overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));



	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow(superOnShow) {
	var page = this;
	superOnShow();
	page.webview1.loadURL(url);
}

// Page.onLoad -> This event is called once when page is created.
function onLoad(superOnLoad) {
	superOnLoad();
	var page = this;
	var wv = page.webview1;
	// wv.onLoad = function(e) {
	// 	if (e.url !== url)
	// 		return;
	// 	wv.evaluateJS(js1, function(value) {
	// 		alert(String(value), "onLoad");
	// 	});
	// };

	wv.onShow = function(e) {
		if (e.url !== url)
			return;
		wv.evaluateJS(js2, function(value) {
			alert(String(value), "onShow");
		});
	};
	
	 wv.onChangedURL = function(e) {
	 	alert(e.url, "New URL");
	 };
}

module && (module.exports = PgWebView);
