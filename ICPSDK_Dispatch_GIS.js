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
        root.ICPSDK_Dispatch_GIS = factory();
    }
}(this, function() {
    function ICPSDK_Dispatch_GIS() {};


    return ICPSDK_Dispatch_GIS;
}));
