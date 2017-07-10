const Page = require("sf-core/ui/page");
const FlexLayout = require("sf-core/ui/flexlayout");
const Button = require("sf-core/ui/button");
const Label = require("sf-core/ui/label");
const SpeechRecognizer = require("sf-core/speechrecognizer");
const Application = require("sf-core/application");
const System = require("sf-core/device/system");
const extend = require("js-base/core/extend");

var Page1 = new extend(Page)(
    function(_super, params) {
        _super(this, {
            onShow: function() {},
            onLoad: function() {
                var myFlexLayout = new FlexLayout({
                    flexGrow: 1,
                    flexDirection: FlexLayout.FlexDirection.COLUMN
                });

                var myButton = new Button({
                    flexGrow: 1,
                    text: "START SPEECH",
                    onPress: function() {
                        if (!SpeechRecognizer.isRunning()) {
                            myButton.text = "Stop Recording";
                            if (System.OS === "iOS") {
                                startSpeechRecognizer();
                            }
                            else if (System.OS === "Android") {
                                const RECORD_AUDIO_CODE = 1002;
                                Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.android.Permissions.RECORD_AUDIO);
                                Application.android.onRequestPermissionsResult = function(e) {
                                    if (e.requestCode === RECORD_AUDIO_CODE && e.result) {
                                        startSpeechRecognizer();
                                    }
                                };
                            }
                        }
                        else {
                            myButton.text = "Start Recording";
                            SpeechRecognizer.stop();
                        }
                    }
                });

                var myLabel = new Label({
                    flexGrow: 3,
                    text: "Result is here"
                });
                myFlexLayout.addChild(myButton);
                myFlexLayout.addChild(myLabel);

                function startSpeechRecognizer() {
                    SpeechRecognizer.start({
                        onResult: function(result) {
                            myLabel.text = result;
                        },
                        onFinish: function(result) {
                            myButton.text = "Start Recording";
                            alert("Finish : " + result);
                        },
                        onError: function(error) {
                            myButton.text = "Start Recording";
                            alert("Error : " + error);
                        }
                    });
                }
                this.headerBar.leftItemEnabled = false;
                this.layout.addChild(myFlexLayout);
            }
        });
    }
);

module.exports = Page1;