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
        root.ICPSDK_Dispatch_Auth = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Auth() {};

    /**
     * login
     * @param param {
     *  isdn: ,
     *  password: ,
     *  force: ,
     *  localip: ,
     *  callback: ,
     * }
     */
    ICPSDK_Dispatch_Auth.prototype.login = function(param) {
        if (undefined == param) {
            huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "param is invalid" });
            return;
        }

        if (undefined == param["callback"] || typeof param["callback"] != "function") {
            huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "callback is not a function" });
            return;
        }

        var loginParam = {};
        var result = {
            "rsp": "-2",
            "message": ""
        };

        if (!huaweiICPSDK.util.checkIsdn(param["isdn"])) {
            result["message"] = "isdn is invalid";
            param["callback"](result);
            return;
        }

        if (!(param["password"] && param["password"].length >= 1 && param["password"].length <= 16)) {
            result["message"] = "password is invalid";
            param["callback"](result);
            return;
        }

        if (!(param["localip"] && huaweiICPSDK.util.checkIp(param["localip"]))) {
            result["message"] = "localip is invalid";
            param["callback"](result);
            return;
        }

        loginParam["password"] = param["password"];
        loginParam["localip"] = param["localip"];

        if (param["force"] && param["force"] == "true") {
            loginParam["force"] = param["force"];
        }
        var url = huaweiICPSDK.getSdkServerUrl() + "/v1/register/" + param["isdn"] + "/login";

        var ajaxCfg = {
            "type": "PUT",
            "url": url,
            "async": false,
            "data": loginParam,
            "callback": param["callback"]
        }
        huaweiICPSDK.util.ajax(ajaxCfg);

    }

    return ICPSDK_Dispatch_Auth;
}));
