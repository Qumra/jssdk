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
        root.ICPSDK_Dispatch_Event = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Event() {
        this.eventList = {
            "voice": {
                "ringing": {

                }
            }
        };
    };

    ICPSDK_Dispatch_Event.prototype.register = function(eventType, eventName, handle) {
        if (typeof handle === "function") {
            huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "register failed. Because handle is not a function." });
            return;
        }
        var eventTypeObject = this.eventList[eventType];
        if (undefined == eventTypeObject) {
            huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "register failed. Because eventType is invalid." });
            return;
        }
        var eventObject = eventTypeObject[eventName];
        if (undefined == eventObject) {
            huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "register failed. Because eventName is invalid." });
            return;
        }
        eventObject["handle"] = handle;
    }



    return ICPSDK_Dispatch_Event;
}));
