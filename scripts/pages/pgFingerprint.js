const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const Button = require('sf-core/ui/button');
const FlexLayout = require('sf-core/ui/flexlayout');
const System = require('sf-core/device/system');

var pageDemo = extend(Page)(
    function(_super) {
        _super(this);
        
        var myButtonFingerPrintAvailable = new Button({
            text: 'FingerPrint Available',
            height: 75,
            width: 200,
            margin: 15,
            onPress: function() {
                alert("System.fingerPrintAvailable: "+ System.fingerPrintAvailable);
                console.log("System.fingerPrintAvailable: "+ System.fingerPrintAvailable);
            }.bind(this)
        });
        
        var myButtonAuthFingerPrint = new Button({
            text: 'Authenticate with FingerPrint',
            height: 75,
            width: 200,
            margin: 15,
            onPress: function() {
                if(System.fingerPrintAvailable){
                    System.validateFingerPrint({
                           android: {
                               title: "Title"
                           },
                           message : "Message",
                           onSuccess : function(){
                                 alert("You have been successfully logged in");
                           },
                           onError : function(){
                                 alert("Login failed");
                           }
                     });
                }
                else{
                    if(System.OS === 'iOS'){
                        alert("Fingerprint is not available. You should enable TouchID to use this authentication.");
                    }
                    else{
                        alert("Fingerprint is not available. If your device supprorts fingerprint, you should add at least one fingerprint.");
                    }
                }

            }.bind(this)
        });
        
        this.layout.flexWrap = FlexLayout.FlexWrap.WRAP;
        this.layout.flexDirection = FlexLayout.FlexDirection.ROW;
        this.layout.justifyContent = FlexLayout.JustifyContent.SPACE_AROUND;
        this.layout.addChild(myButtonFingerPrintAvailable);
        this.layout.addChild(myButtonAuthFingerPrint);
    }
);
module.exports = pageDemo;