const extend     = require("js-base/core/extend");
const Page       = require("sf-core/ui/page");
const FlexLayout = require('sf-core/ui/flexlayout');
const SwipeView  = require('sf-core/ui/swipeview');
const Label      = require('sf-core/ui/label');
const Color      = require('sf-core/ui/color');

var Page1 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.layout.backgroundColor = Color.RED; 
        }.bind(this);
    }
);
var Page2 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.layout.backgroundColor = Color.YELLOW; 
        }.bind(this);
    }
);
var Page3 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.layout.backgroundColor = Color.BLUE; 
        }.bind(this);
    }
);
var Page4 = extend(Page)(
    function(_super, params) {
        _super(this, params);
        this.onLoad = function() {
            this.layout.backgroundColor = Color.GREEN;
        }.bind(this);
    }
);

var SwipeViewPage = extend(Page)(
    function(_super) {
        var self = this;
        _super(this);
        
        this.onLoad = function() {
            self.statusBar.visible = false;
            self.headerBar.visible = false;
            self.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
            self.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
            self.layout.alignItems = FlexLayout.AlignItems.CENTER;

            var swipeView = new SwipeView({
                page: self,
                width:300, maxHeight:300, marginTop:50,
                pages: [Page1, Page2, Page3, Page4],
                onStateChanged: function(state) {
                    if (SwipeView.State.IDLE === state) {
                        labelState.text = "State: IDLE";
                    } else {
                        labelState.text = "State: DRAGGING";
                    }
                }
            });
            self.layout.addChild(swipeView);
            
            var labelState = new Label({
                width:200, height:65,
                text: "Waiting for State",
            });
            self.layout.addChild(labelState);
            self.layout.applyLayout();
        };
    }
);

module.exports = SwipeViewPage;