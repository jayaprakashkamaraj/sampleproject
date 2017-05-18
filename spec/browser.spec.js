define(["require", "exports", "../src/browser"], function (require, exports, browser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var iPhoneUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) ' +
        'AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
    var androidPhoneUa = 'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JWR66Y) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.92 Safari/537.36';
    var windowsPhoneUa = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; ' +
        'Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)';
    var chromeDesktopUa = 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36';
    var firefoxUa = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0';
    var edgeUa = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240';
    var ieUa = 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; .NET4.0E; .NET4.0C; ' +
        'Tablet PC 2.0; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; InfoPath.3; rv:11.0) like Gecko';
    var safariUa = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.5.24 (KHTML, like Gecko)' +
        ' Version/9.1.4 Safari/601.5.24';
    var operaUa = 'Mozilla/5.0 (Windows NT 6.3; WOW64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36 OPR/34.0.2036.50';
    var panthomUa = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1';
    var curBrowser = new browser_1.Browser();
    describe('Browser', function () {
        describe('Android uA', function () {
            browser_1.Browser.userAgent = androidPhoneUa;
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('chrome');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('30.0.1599.92');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(true);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(true);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
        });
        describe('IOS uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = iPhoneUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('safari');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('9.0');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(true);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(true);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
        });
        describe('Windows uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = windowsPhoneUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('msie');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('10.0');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(true);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(true);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(true);
            });
        });
        describe('Chrome uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = chromeDesktopUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('chrome');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('50.0.2661.102');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
        });
        describe('Opera uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = operaUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('opera');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('34.0.2036.50');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
        });
        describe('Firefox uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = firefoxUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('mozilla');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('44.0');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
        });
        describe('Edge browser uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = edgeUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('edge');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('12.10240');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(true);
            });
        });
        describe('IE browser uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = ieUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('msie');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('11.0');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(true);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(true);
            });
        });
        describe('panthomJS browser uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = panthomUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('phantomjs');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('2.1.1');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
            it('webview', function () {
                expect(browser_1.Browser.isWebView).toBe(false);
            });
        });
        describe('Safari browser uA', function () {
            beforeAll(function () {
                browser_1.Browser.userAgent = safariUa;
            });
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('safari');
            });
            it('browser version', function () {
                expect(browser_1.Browser.info.version).toBe('9.1.4');
            });
            it('browser culture language', function () {
                expect(browser_1.Browser.info.culture.language).toBe(navigator.language);
            });
            it('isAndroid', function () {
                expect(browser_1.Browser.isAndroid).toBe(false);
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isIos', function () {
                expect(browser_1.Browser.isIos).toBe(false);
            });
            it('isIos7', function () {
                expect(browser_1.Browser.isIos7).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('isWindows', function () {
                expect(browser_1.Browser.isWindows).toBe(false);
            });
            it('webview', function () {
                expect(browser_1.Browser.isWebView).toBe(false);
            });
        });
        describe('browser without resetting userAgent', function () {
            it('browser name', function () {
                expect(browser_1.Browser.info.name).toBe('safari');
            });
            it('isDevice', function () {
                expect(browser_1.Browser.isDevice).toBe(false);
            });
            it('isIE', function () {
                expect(browser_1.Browser.isIE).toBe(false);
            });
            it('isMSPointer', function () {
                expect(browser_1.Browser.isMSPointer).toBe(false);
            });
            it('isPointer', function () {
                expect(browser_1.Browser.isPointer).toBe(false);
            });
            it('isTouch', function () {
                expect(browser_1.Browser.isTouch).toBe('ontouchstart' in window);
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchStartEvent).not.toBe('');
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchMoveEvent).not.toBe('');
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchEndEvent).not.toBe('');
            });
        });
        describe('touch event name', function () {
            it('browser name', function () {
                expect(browser_1.Browser.touchStartEvent).not.toBe('');
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchMoveEvent).not.toBe('');
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchEndEvent).not.toBe('');
            });
        });
        describe('touch event name', function () {
            it('browser name', function () {
                expect(browser_1.Browser.touchStartEvent).not.toBe('');
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchMoveEvent).not.toBe('');
            });
            it('browser name', function () {
                expect(browser_1.Browser.touchEndEvent).not.toBe('');
            });
        });
        describe('webview', function () {
            it('false webview', function () {
                expect(browser_1.Browser.isWebView).toBe(false);
            });
            it('simulated webview', function () {
                var win = window;
                win.browserDetails = {};
                win.phonegap = true;
                expect(browser_1.Browser.isWebView).toBe(true);
            });
        });
    });
});
