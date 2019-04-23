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
