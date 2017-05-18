define(["require", "exports", "../src/ajax", "../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ajax_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Ajax', function () {
        describe('onSuccess event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax options using objects.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax();
                ajaxObj.url = '/test';
                ajaxObj.type = 'GET';
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(ajaxObj.url);
                expect(request.method).toBe('GET');
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response from Ajax'
                });
                expect(doneFn).toHaveBeenCalled();
            });
            it('Ajax event get success.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax('/test', 'GET', true);
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe(ajaxObj.url);
                expect(request.method).toBe('GET');
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response from Ajax'
                });
                expect(doneFn).toHaveBeenCalled();
            });
            it('Ajax event get success without async.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax('/test');
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                expect(request.method).toBe('GET');
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response without async'
                });
                expect(doneFn).toHaveBeenCalled();
            });
        });
        describe('onFailure event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get failure.', function () {
                var failFn = jasmine.createSpy('onFailure');
                var ajaxObj = new ajax_1.Ajax('ajax.ts', 'GET', true);
                ajaxObj.onFailure = failFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                expect(failFn).not.toHaveBeenCalled();
                request.respondWith({});
                expect(failFn).toHaveBeenCalled();
            });
            it('Ajax event get failure without async.', function () {
                var failFn = jasmine.createSpy('onFailure');
                var ajaxObj = new ajax_1.Ajax('ajax.ts', 'GET');
                ajaxObj.onFailure = failFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                expect(failFn).not.toHaveBeenCalled();
                request.respondWith({});
                expect(failFn).toHaveBeenCalled();
            });
        });
        describe('Send method', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get success with data in send method.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax('/test', 'GET', true);
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send('some string');
                var request = jasmine.Ajax.requests.mostRecent();
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response from Ajax'
                });
                expect(doneFn).toHaveBeenCalled();
                expect(request.params).toEqual(ajaxObj.data);
            });
        });
        describe('without onSuccess event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get success.', function () {
                var ajaxObj = new ajax_1.Ajax('/test', 'GET', true);
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'responseText': 'Response from Ajax'
                });
                expect(ajaxObj.httpRequest.responseText).toEqual('Response from Ajax');
            });
        });
        describe('without onFailure event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get failure.', function () {
                var ajaxObj = new ajax_1.Ajax('ajax.ts', 'GET', true);
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'responseText': 'XMLHttpRequest failed'
                });
                expect(ajaxObj.httpRequest.responseText).toEqual('XMLHttpRequest failed');
            });
        });
        describe('getResponseHeader', function () {
            var ajax;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                ajax = new ajax_1.Ajax('mock/url', 'GET');
                var promise = ajax.send();
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify([{ Item: 1 }, { Item: 2 }, { Item: 3 }]),
                    'responseHeaders': { 'testheader': 'hi', 'Content-Type': 'application/json' }
                });
                promise.then(function (e) {
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check responseHeaders', function () {
                expect(ajax.getResponseHeader('testheader')).toBe('hi');
                expect(ajax.getResponseHeader('dude')).toBeNull();
            });
        });
        describe('option as object', function () {
            var ajax;
            var request;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                ajax = new ajax_1.Ajax({ url: 'mock/url', type: 'GET' });
                var promise = ajax.send();
                _this.request = jasmine.Ajax.requests.mostRecent();
                _this.request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify([{ Item: 1 }, { Item: 2 }, { Item: 3 }])
                });
                promise.then(function (e) {
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check options in request', function () {
                expect(_this.request.url).toBe(ajax.url);
                expect(_this.request.method).toBe(ajax.type);
            });
        });
        describe('beforeSend callback', function () {
            var ajax;
            var request;
            var spyBeforeSend = jasmine.createSpy('beforeSend');
            beforeAll(function (done) {
                jasmine.Ajax.install();
                ajax = new ajax_1.Ajax({
                    url: 'mock/url', type: 'GET', beforeSend: spyBeforeSend,
                    dataType: 'json', contentType: 'application/json', data: JSON.stringify({ hi: 'hello' })
                });
                var promise = ajax.send();
                _this.request = jasmine.Ajax.requests.mostRecent();
                _this.request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': ''
                });
                promise.then(function (e) {
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('beforeSend call check', function () {
                expect(spyBeforeSend).toHaveBeenCalled();
                expect(_this.request.requestHeaders['Content-Type']).toBe('application/json');
            });
        });
    });
});
