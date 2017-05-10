define(["require", "exports", "../src/touch", "../src/dom"], function (require, exports, touch_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var touchTestObj;
    var node;
    var direction;
    var tEvents = {
        tapEvent: function () { },
        doubleTapEvent: function () { },
        tapHold: function () { },
        swipe: function (e) { direction = e.swipeDirection; },
        scroll: function () { }
    };
    var startMouseEventArs = {
        clientX: 200, clientY: 200, target: node, type: 'touchstart',
        preventDefault: function () { }
    };
    var moveMouseEventArs = {
        clientX: 500, clientY: 400, target: node, type: 'touchmove',
        preventDefault: function () { }
    };
    var endMouseEventArs = {
        clientX: 200, clientY: 200, target: node, type: 'touchend',
        preventDefault: function () { }
    };
    function TapEventTest(done, delay) {
        touchTestObj.startEvent(startMouseEventArs);
        touchTestObj.endEvent(endMouseEventArs);
        setTimeout(function () {
            done();
        }, delay);
    }
    function DoubleTapEventTest(done) {
        touchTestObj.startEvent(startMouseEventArs);
        touchTestObj.endEvent(endMouseEventArs);
        touchTestObj.startEvent(startMouseEventArs);
        touchTestObj.endEvent(endMouseEventArs);
        setTimeout(function () {
            done();
        }, 350);
    }
    node = dom_1.createElement('div', { id: 'test' });
    touchTestObj = new touch_1.Touch(node);
    touchTestObj.doubleTap = function () { tEvents.doubleTapEvent(); };
    touchTestObj.swipe = function (e) { tEvents.swipe(e); };
    touchTestObj.scroll = function () { tEvents.scroll(); };
    touchTestObj.tap = function () { tEvents.tapEvent(); };
    touchTestObj.onPropertyChanged();
    describe('Touch', function () {
        beforeEach(function () {
            spyOn(tEvents, 'tapEvent').and.callThrough();
            spyOn(tEvents, 'doubleTapEvent').and.callThrough();
            spyOn(tEvents, 'tapHold').and.callThrough();
            spyOn(tEvents, 'swipe').and.callThrough();
            spyOn(tEvents, 'scroll').and.callThrough();
        });
        describe('Initialization of touch', function () {
            it('empty constructor', function () {
                var ele = dom_1.createElement('div', { id: 'test' });
                var objTouch = new touch_1.Touch(ele);
                expect(ele.classList.contains('e-touch')).toEqual(true);
            });
            it('constructor with options', function () {
                var ele = dom_1.createElement('div', { id: 'test' });
                var objTouch = new touch_1.Touch(ele, { doubleTap: function () { } });
                expect(typeof objTouch.doubleTap).toEqual('function');
                expect(ele.classList.contains('e-touch')).toEqual(true);
            });
            it('ie browser constructor', function () {
                var ele = dom_1.createElement('div', { id: 'test' });
                var myWindow = window;
                myWindow['browserDetails'].isIE = true;
                var objTouch = new touch_1.Touch(ele, { doubleTap: function () { } });
                expect(typeof objTouch.doubleTap).toEqual('function');
                expect(ele.classList.contains('e-block-touch')).toEqual(true);
            });
        });
        describe('Swipe', function () {
            it('event handler callback on swipe vertical', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientY = 400;
                var swipeFn = jasmine.createSpy('clickEvent');
                touchTestObj.swipe = swipeFn;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                expect(swipeFn).toHaveBeenCalled();
                touchTestObj.swipe = undefined;
            });
            it('event handler callback on swipe horizontal', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientX = 400;
                var swipeFn = jasmine.createSpy('swipeEvent');
                touchTestObj.addEventListener('swipe', swipeFn);
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                expect(swipeFn).toHaveBeenCalled();
            });
            it('swipe callback test on swipe down', function () {
                touchTestObj.swipe = function (e) { tEvents.swipe(e); };
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientY = 400;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Down');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe callback test on swipe up', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientY = 100;
                movedEnd.clientX = 200;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Up');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe callback test on swipe direction right.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientX = 400;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Right');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe callback test on swipe left', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.clientX = 100;
                movedEnd.clientY = 200;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(movedEnd);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Left');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe event callback test without handler.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.clientX = 100;
                movedEnd.clientY = 200;
                touchTestObj.swipe = undefined;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(movedEnd);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                touchTestObj.addEventListener('swipe', function (e) { tEvents.swipe(e); });
            });
        });
        describe('Scroll event', function () {
            it('event handler callback on scroll', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientY = 300;
                var scrollFn = jasmine.createSpy('scrollEvt');
                touchTestObj.scroll = scrollFn;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(scrollFn).toHaveBeenCalled();
            });
            it('scroll event callback test on vertical scrolling.', function () {
                touchTestObj.scroll = function () { tEvents.scroll(); };
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientY = 300;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).toHaveBeenCalled();
            });
            it('scroll event callback test on vertical scrolling.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientY = 300;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).toHaveBeenCalled();
            });
            it('scroll event callback test on horizontal scrolling.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientX = 300;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).toHaveBeenCalled();
            });
            it('scroll event callback test on without move action.', function () {
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(startMouseEventArs);
                touchTestObj.endEvent(startMouseEventArs);
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
            it('left and right scroll direction', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                var direction = '';
                moveArgs.clientX = 400;
                touchTestObj.scroll = function (e) {
                    direction = e.scrollDirection;
                };
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Right');
                moveArgs.clientX = 50;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Left');
            });
            it('scroll event callback test without handler.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientX = 300;
                touchTestObj.scroll = undefined;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).not.toHaveBeenCalled();
                touchTestObj.addEventListener('scroll', function () { tEvents.scroll(); });
            });
        });
        describe('Doubletap event handler', function () {
            var doubleTapFn = jasmine.createSpy('doubleTap');
            touchTestObj.addEventListener('doubleTap', doubleTapFn);
            beforeEach(function (done) {
                touchTestObj.doubleTap = null;
                DoubleTapEventTest(done);
            });
            it('doubletap event callback with event handler', function () {
                expect(doubleTapFn).toHaveBeenCalled();
            });
        });
        describe('Doubletap event', function () {
            beforeEach(function (done) {
                touchTestObj.doubleTap = function () { tEvents.doubleTapEvent(); };
                DoubleTapEventTest(done);
            });
            it('doubletap event callback.', function () {
                expect(tEvents.doubleTapEvent).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('TapHold event', function () {
            beforeEach(function (done) {
                touchTestObj.startEvent(startMouseEventArs);
                setTimeout(function () {
                    done();
                }, 750);
            });
            it('taphold event callback with handler', function () {
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('TapHold event', function () {
            beforeEach(function (done) {
                touchTestObj.taphold = function () { tEvents.tapHold(); };
                touchTestObj.startEvent(startMouseEventArs);
                setTimeout(function () {
                    done();
                }, 750);
            });
            it('taphold event callback with handler', function () {
                expect(tEvents.tapHold).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('Tap event', function () {
            var tapFn = jasmine.createSpy('tapEvent');
            beforeEach(function (done) {
                touchTestObj.tap = tapFn;
                TapEventTest(done, 500);
            });
            it('event handler for tap event', function () {
                expect(tapFn).toHaveBeenCalled();
            });
            beforeEach(function (done) {
                touchTestObj.tap = function () { tEvents.tapEvent(); };
                TapEventTest(done, 500);
            });
            it('tap event callback 500ms delay with doubletap.', function () {
                expect(tEvents.tapEvent).toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
            beforeEach(function (done) {
                touchTestObj.doubleTap = null;
                TapEventTest(done, 0);
            });
            it('tap event callback 0ms delay without doubletap.', function () {
                expect(tEvents.tapEvent).toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('Changed touches', function () {
            it('changed touches event argument', function () {
                var startEvt = { changedTouches: [startMouseEventArs], preventDefault: function () { } };
                var moveEvt = { changedTouches: [moveMouseEventArs], preventDefault: function () { } };
                touchTestObj.startEvent(startEvt);
                touchTestObj.moveEvent(moveEvt);
                touchTestObj.endEvent(moveEvt);
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.doubleTapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
        });
        describe('Method event', function () {
            it('destroy class test', function () {
                var ele = dom_1.createElement('div', { id: 'test' });
                var objTouch = new touch_1.Touch(ele);
                objTouch.tapholdThreshold = 650;
                expect(ele.classList.contains('e-touch')).toEqual(true);
                objTouch.destroy();
                expect(ele.classList.contains('e-touch')).toEqual(false);
            });
        });
        describe('swipe while scroll', function () {
            var inst;
            var element;
            var spy;
            var spy1;
            beforeAll(function () {
                element = dom_1.createElement('div', {
                    id: 'test', innerHTML: "Swipe while scroll\n                India is a vast South Asian<br>\n                Capital: New Delhi<br>\n                President: Pranab Mukherjee<br>\n                Prime minister: Narendra Modi<br>\n                Population: 1.252 billion (2013) World Bank<br>\n                Currency: Indian rupee<br>\n                Gross domestic product: 1.877 trillion USD (2013) World Bank\n\n                India is a vast South Asian country with<br>\n                Capital: New Delhi<br>\n                President: Pranab Mukherjee<br>\n                Prime minister: Narendra Modi<br>\n                Population: 1.252 billion (2013) World Bank<br>\n                Currency: Indian rupee<br>\n                Gross domestic product: 1.877 trillion USD (2013) World Bank\n                India is a vast South Asian<br>\n                Capital: New Delhi<br>\n                President: Pranab Mukherjee<br>\n                Prime minister: Narendra Modi<br>\n                Population: 1.252 billion (2013) World Bank<br>\n                Currency: Indian rupee<br>\n                Gross domestic product: 1.877 trillion USD (2013) World Bank",
                    styles: 'overflow:auto;width:250px;height:350px'
                });
                document.body.appendChild(element);
                inst = new touch_1.Touch(element, {});
            });
            beforeEach(function () {
                spy = jasmine.createSpy('testSpy');
                spy1 = jasmine.createSpy('tSpy');
            });
            afterAll(function () {
                var child = document.getElementById('test');
                document.removeChild(child);
            });
            it('no swipe - Up', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                var startEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 400, target: node, type: 'touchmove',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('no swipe - Down', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                document.getElementById('test').scrollTop = 50;
                var startEvt = {
                    clientX: 100, clientY: 400, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 420, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('no swipe - Left', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                var startEvt = {
                    clientX: 150, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('no swipe - Right', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                document.getElementById('test').scrollLeft = 70;
                var startEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 150, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('swipe - Up', function () {
                document.getElementById('test').scrollTop = 240;
                inst.swipe = spy;
                var startEvt = {
                    clientX: 100, clientY: 470, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 410, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).toHaveBeenCalled();
            });
            it('swipe - Down', function () {
                document.getElementById('test').scrollTop = 0;
                inst.swipe = spy;
                var startEvt = {
                    clientX: 100, clientY: 410, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 470, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).toHaveBeenCalled();
            });
            it('swipe - Right', function () {
                inst.swipe = spy;
                var startEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 170, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).toHaveBeenCalled();
            });
            it('swipe - Left', function () {
                document.getElementById('test').scrollLeft = 195;
                inst.swipe = spy;
                var startEvt = {
                    clientX: 170, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
