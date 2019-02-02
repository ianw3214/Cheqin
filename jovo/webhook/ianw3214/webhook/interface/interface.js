"use strict";
exports.__esModule = true;
var Interface = /** @class */ (function () {
    function Interface(req, res) {
        this.hasWriteFileAccess = false;
        this.req = req;
        this.res = res;
        this.headers = req.headers;
        this.$request = req.body;
    }
    Interface.prototype.getRequestObject = function () {
        return this.$request;
    };
    Interface.prototype.setResponse = function (obj) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.res.json(obj);
            resolve();
        });
    };
    return Interface;
}());
exports.Interface = Interface;
