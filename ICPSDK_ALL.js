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
            huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "sdkServerUrl is invalid" });
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
}));(function(root, factory) {
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

        if (param["force"] && (param["force"] == "true" || param["force"] == true)) {
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
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_Device = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Device() {};


    return ICPSDK_Dispatch_Device;
}));(function(root, factory) {
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
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_GIS = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_GIS() {};


    return ICPSDK_Dispatch_GIS;
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_Group = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Group() {};


    return ICPSDK_Dispatch_Group;
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_Sms = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Sms() {};


    return ICPSDK_Dispatch_Sms;
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_Video = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Video() {};


    return ICPSDK_Dispatch_Video;
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_Voice = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_Voice() {};


    return ICPSDK_Dispatch_Voice;
}));(function(root, factory) {
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
        root.ICPSDK_Dispatch_WebSocket = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_WebSocket() {};


    return ICPSDK_Dispatch_WebSocket;
}));(function(root, factory) {
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
        root.ICPSDK_Util = factory();
    }
}(this, function() {
    function ICPSDK_Util() {};

    /**
     * logParam is json object
     * {
     *   "logLevel" : debug|info|warn|error
     *   "logMsg" : message
     * }
     */
    ICPSDK_Util.prototype.log = function(logParam) {
        var date = new Date().format("yyyy-MM-dd hh:mm:ss");
        if (logParam["logLevel"] == "debug") {
            console.debug("HuaweiICPSDK's Log: " + date + " " + logParam["logMsg"]);
        }
        if (logParam["logLevel"] == "info") {
            console.info("HuaweiICPSDK's Log: " + date + " " + logParam["logMsg"]);
        }
        if (logParam["logLevel"] == "warn") {
            console.warn("HuaweiICPSDK's Log: " + date + " " + logParam["logMsg"]);
        }
        if (logParam["logLevel"] == "error") {
            console.error("HuaweiICPSDK's Log: " + date + " " + logParam["logMsg"]);
        }
    };


    /**
     * @param cfg {
     *  "type" : "POST|PUT|DELETE|GET"
     *  "url" : 
     *  "async" : 
     *  "timeout" : 
     *  "contentType" : 
     *  "data" : //post和put请求时设置
     *  "callback" : 
     * }
     */
    ICPSDK_Util.prototype.ajax = function(cfg) {
        var settings = {};
        settings.type = cfg.type;
        settings.timeout = cfg.timeout || 2400000;
        settings.async = cfg.async != false;
        if (cfg.data) {
            settings.data = JSON.stringify(cfg.data);
        }
        settings.contentType = cfg.contentType || "application/json";
        if (typeof cfg.callback === "function") {
            settings.success = function(data) {
                var jsonObject = JSON.parse(data);
                if (cfg["url"].indexOf("/login") != -1 && jsonObject["rsp"] == "4011") {
                    //login success
                    huaweiICPSDK.userInfo["session"] = jsonObject["session"];
                }
                cfg.callback(jsonObject);
            }

            settings.error = function(data) {
                huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "unkown exception when send request. See the brower's console." });
                var result = {
                    "rsp": "-1"
                };
                cfg.callback(data);
            }

        } else {
            settings.error = function(data) {
                huaweiICPSDK.util.log({ "logLevel": "error", "logMsg": "unkown exception when send request. See the brower's console." });
            }
        }


        settings.beforeSend = function(XMLHttpRequest) {
            var session = huaweiICPSDK.userInfo["session"];
            if (session) {
                XMLHttpRequest.setRequestHeader("session", session);
            }
        };

        $.ajax(cfg["url"], settings);

    }

    /**
     * check the string param is number
     * @param param 
     */
    ICPSDK_Util.prototype.isNumber = function(param) {
        if (undefined == param) {
            return false;
        }
        var regex = /^[1-9]+[0-9]*]*$/;
        if (regex.test(param)) {
            return true;
        }
        return false;
    }

    /**
     * check isdn is valid
     * @param isdn
     */
    ICPSDK_Util.prototype.checkIsdn = function(isdn) {
        if (isdn && isdn.length <= 8 && this.isNumber(isdn)) {
            return true;
        }
        return false;
    }

    /**
     * check ip is valid
     * @param ip
     */
    ICPSDK_Util.prototype.checkIp = function(ip) {
        if (undefined == ip) {
            return false;
        }
        var regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (regex.test(ip)) {
            return true;
        }
        return false;
    }

    Date.prototype.format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };


    return ICPSDK_Util;
}));
