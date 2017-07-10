const extend = require("js-base/core/extend");
const Router = require("sf-core/ui/router");
const Application = require("sf-core/application");

// Get generetad UI code
var Page1Design = require("../ui/ui_page1");

const Page1 = extend(Page1Design)(
    function(_super) {
        var self = this;
        _super(self);

        this.headerBar.leftItemEnabled = false;
        this.children.flexlayout.children.btn.onPress = btn_onPress.bind(this);
        this.btnNext.onPress = btnNext_onPress.bind(this);
    });

function btnNext_onPress() {
    Router.go("page2", {
        message: "Hello World!"
    });
}



// Gets/sets press event callback for btn
function btn_onPress() {
    Application.call("smartface-emulator://alper?x=4", {
        origin: "Smartface_App1"
    }, function() {
        alert("Application call completed");
    }, function() {
        alert("Application call failed");
    }, true, "Choose an Application");
}

module && (module.exports = Page1);
