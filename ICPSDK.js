var huaweiICPSDK;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.ICPSDK = factory();
    }
}(this, function() {
    /**
     * 
     * @param {*} config {
     *  sdkServerUrl: "", //eg:https://10.120.224.229:8015/sdkserver
     * }
     */
    function ICPSDK(config) {

        this.util = new ICPSDK_Util();
        this.config = config;
        if (!config["sdkServerUrl"]) {
            this.util.log({ "logLevel": "error", "logMsg": "sdkServerUrl is invalid" });
        }
        this.dispatch = {};
        this.dispatch.auth = new ICPSDK_Dispatch_Auth();
        this.dispatch.event = new ICPSDK_Dispatch_Event();
        this.dispatch.gis = new ICPSDK_Dispatch_GIS();
        this.dispatch.sms = new ICPSDK_Dispatch_Sms();
        this.dispatch.voice = new ICPSDK_Dispatch_Voice();
        this.dispatch.video = new ICPSDK_Dispatch_Video();
        this.dispatch.wesocket = new ICPSDK_Dispatch_WebSocket();
        this.dispatch.device = new ICPSDK_Dispatch_Device();
        this.userInfo = {
            "session": "",
        };
        huaweiICPSDK = this;
    };

    ICPSDK.prototype.getSdkServerUrl = function() {
        return this.config["sdkServerUrl"];
    }

    return ICPSDK;
}));
