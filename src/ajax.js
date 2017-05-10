define(["require", "exports", "./util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var headerRegex = /^(.*?):[ \t]*([^\r\n]*)$/gm;
    var defaultType = 'GET';
    var Ajax = (function () {
        function Ajax(options, type, async) {
            this.mode = true;
            this.options = {};
            if (typeof options === 'string') {
                this.url = options;
                this.type = type ? type.toUpperCase() : defaultType;
                this.mode = !util_1.isNullOrUndefined(async) ? async : true;
            }
            else if (typeof options === 'object') {
                this.options = options;
                util_1.merge(this, this.options);
            }
            this.type = this.type ? this.type.toUpperCase() : defaultType;
        }
        Ajax.prototype.send = function (data) {
            var _this = this;
            this.data = util_1.isNullOrUndefined(data) ? this.data : data;
            var promise = new Promise(function (resolve, reject) {
                _this.httpRequest = new XMLHttpRequest();
                _this.httpRequest.onreadystatechange = function () { _this.stateChange(resolve, reject); };
                _this.httpRequest.open(_this.type, _this.url, _this.mode);
                if (!util_1.isNullOrUndefined(_this.data)) {
                    _this.httpRequest.setRequestHeader('Content-Type', _this.contentType || 'application/json; charset=utf-8');
                }
                if (_this.beforeSend) {
                    _this.beforeSend();
                }
                _this.httpRequest.send(!util_1.isNullOrUndefined(_this.data) ? _this.data : null);
            });
            return promise;
        };
        Ajax.prototype.successHandler = function (data) {
            if (this.onSuccess) {
                this.onSuccess(data, this);
            }
            return data;
        };
        Ajax.prototype.failureHandler = function (reason) {
            if (this.onFailure) {
                this.onFailure(this.httpRequest);
            }
            return reason;
        };
        Ajax.prototype.stateChange = function (resolve, reject) {
            var data = this.httpRequest.responseText;
            if (this.dataType && this.dataType.toLowerCase() === 'json') {
                if (data === '') {
                    data = undefined;
                }
                else {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (error) {
                    }
                }
            }
            if (this.httpRequest.readyState === 4) {
                if (this.httpRequest.status === 200 || this.httpRequest.status === 304) {
                    resolve(this.successHandler(data));
                }
                else {
                    reject(new Error(this.failureHandler(this.httpRequest.statusText)));
                }
            }
        };
        Ajax.prototype.getResponseHeader = function (key) {
            var responseHeaders;
            var header;
            responseHeaders = {};
            var headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
            while (headers) {
                responseHeaders[headers[1].toLowerCase()] = headers[2];
                headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
            }
            header = responseHeaders[key.toLowerCase()];
            return util_1.isNullOrUndefined(header) ? null : header;
        };
        return Ajax;
    }());
    exports.Ajax = Ajax;
});
