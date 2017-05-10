define(["require", "exports", "../src/dom", "../src/event-handler", "../src/animation"], function (require, exports, dom_1, event_handler_1, animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var animeObj = new animation_1.Animation({});
    var modifiedObj = new animation_1.Animation({
        name: 'FadeOut', duration: 100, timingFunction: 'easeIn', delay: 1
    });
    var element1 = dom_1.createElement('div', { id: 'anime1' });
    var element2 = dom_1.createElement('div', { id: 'anime2' });
    animeObj.onPropertyChanged({}, {});
    describe('Animation # ', function () {
        it('initialize animation object # ', function () {
            expect(animeObj instanceof animation_1.Animation).toEqual(true);
        });
        it('check default name # ', function () {
            expect(animeObj.name).toEqual('FadeIn');
        });
        it('check default duration # ', function () {
            expect(animeObj.duration).toEqual(400);
        });
        it('check default timingFunction # ', function () {
            expect(animeObj.timingFunction).toEqual('ease');
        });
        it('check default timingFunction value # ', function () {
            expect(animeObj.easing[animeObj.timingFunction]).toEqual('cubic-bezier(0.250, 0.100, 0.250, 1.000)');
        });
        it('check default delay # ', function () {
            expect(animeObj.delay).toEqual(0);
        });
        it('check modified name # ', function () {
            expect(modifiedObj.name).toEqual('FadeOut');
        });
        it('check modified duration # ', function () {
            expect(modifiedObj.duration).toEqual(100);
        });
        it('check modified timingFunction # ', function () {
            expect(modifiedObj.timingFunction).toEqual('easeIn');
        });
        it('check modified delay # ', function () {
            expect(modifiedObj.delay).toEqual(1);
        });
        it('check modified animation options with default animation options # ', function () {
            expect(modifiedObj).not.toEqual(animeObj);
        });
        it('check module name # ', function () {
            expect(animeObj.getModuleName()).toEqual('animation');
        });
        it('check notify property change # ', function () {
            modifiedObj.timingFunction = 'cubic-bezier(.29,0,.55,1)';
            expect(modifiedObj.timingFunction).toEqual('cubic-bezier(.29,0,.55,1)');
        });
        it('animate method without options # ', function (done) {
            var animationObj = new animation_1.Animation({});
            animationObj.end = function (model) {
                expect(model.element).toEqual(element1);
                done();
            };
            animationObj.animate(element1);
        });
        describe('animate method with id # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                document.body.appendChild(element1);
                animeObj.animate('#anime1', {
                    timingFunction: 'easeIn', end: function (args) {
                        animeOption = args;
                        done();
                    }
                });
            });
            it('testing callback option # ', function () {
                dom_1.select('#anime1').remove();
                expect(animeOption).not.toBeNull();
            });
        });
        describe('animate method with element # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                modifiedObj.animate(element1, {
                    end: function (args) {
                        animeOption = args;
                        done();
                    }
                });
            });
            it('testing callback option # ', function () {
                expect(animeOption).not.toBeNull();
            });
        });
        describe('animate method with failure # ', function () {
            var error = null;
            beforeEach(function (done) {
                var raf = window.requestAnimationFrame;
                window.requestAnimationFrame = undefined;
                modifiedObj.animate(element2, {
                    fail: function (e) {
                        window.requestAnimationFrame = raf;
                        error = e;
                        done();
                    }
                });
            });
            it('testing promise catch # ', function () {
                expect(error).not.toBeNull();
            });
        });
        describe('animate method with progress # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                modifiedObj.animate(element2, {
                    progress: function (args) {
                        animeOption = args;
                        done();
                    }
                });
            });
            it('expected animation object # ', function () {
                expect(animeOption).not.toBeNull();
            });
            afterAll(function () {
                modifiedObj.destroy();
            });
        });
        describe('EJ2-499: delay time is greater than duration time # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                animeObj.animate(element1, {
                    delay: 1000, duration: 100,
                    progress: function (args) {
                        if (args.timeStamp > args.duration / 2) {
                            animeOption = args;
                            done();
                        }
                    }
                });
            });
            it('testing delay time is greater than duration time with animate method # ', function () {
                expect(animeOption).not.toBeNull();
            });
        });
        describe('EJ2-594: animation for svg elements in IE browser # ', function () {
            var animeAttr = null;
            var element = dom_1.createElement('div', { id: 'anime' });
            describe('testing e-animate attribute # ', function () {
                beforeEach(function (done) {
                    animeObj.animate(element, {
                        progress: function (args) {
                            if (args.timeStamp > (args.delay + args.duration) / 2) {
                                animeAttr = args.element.getAttribute('e-animate');
                                done();
                            }
                        }
                    });
                });
                it('progress event # ', function () {
                    expect(animeAttr).toEqual('true');
                });
            });
            describe('testing e-animate attribute # ', function () {
                beforeEach(function (done) {
                    animeObj.animate(element1, {
                        end: function (args) {
                            animeAttr = args.element.getAttribute('e-animate');
                            done();
                        }
                    });
                });
                it('animation end # ', function () {
                    expect(animeAttr).toEqual(null);
                });
            });
            describe('EJ2-940: animate method with begin and animation end on last frame # ', function () {
                var animeOption = null;
                beforeEach(function (done) {
                    modifiedObj.animate(element2, {
                        begin: function (args) {
                            animeOption = args;
                            done();
                        }
                    });
                });
                it('expected animation object # ', function () {
                    expect(animeOption).not.toBeNull();
                });
                afterAll(function () {
                    modifiedObj.destroy();
                });
            });
        });
        describe('stop animation at inprogress # ', function () {
            describe('with element # ', function () {
                var element = dom_1.createElement('div', { id: 'anime' });
                var animationId = null;
                beforeEach(function (done) {
                    animeObj.animate(element, {
                        progress: function (args) {
                            animationId = args.element.getAttribute('e-animation-id');
                            animation_1.Animation.stop(args.element);
                            done();
                        }
                    });
                });
                it('expected animation id # ', function () {
                    expect(animationId).not.toBeNull();
                });
            });
            describe('with model # ', function () {
                var element = dom_1.createElement('div', { id: 'anime' });
                var timeStamp = null;
                beforeEach(function (done) {
                    animeObj.animate(element, {
                        duration: 600,
                        progress: function (args) {
                            if (args.timeStamp > 300) {
                                animation_1.Animation.stop(args.element, args);
                            }
                        },
                        end: function (args) {
                            timeStamp = args.timeStamp;
                            done();
                        }
                    });
                });
                it('expected timestamp with less than actual duration # ', function () {
                    expect(timeStamp < 400).toEqual(true);
                });
            });
            it('with out animate method # ', function () {
                var element = dom_1.createElement('div', {
                    id: 'anime',
                    attrs: { 'e-animate': 'true' }
                });
                animation_1.Animation.stop(element);
                expect(element.getAttribute('e-animate')).toBeNull();
            });
        });
    });
    var rippleElement = dom_1.createElement('div', { id: 'ripple' });
    var rippleFn = animation_1.ripple(rippleElement);
    describe('Ripple # ', function () {
        describe('check ripple animation # ', function () {
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleElement.getAttribute('e-ripple')).not.toEqual(null);
                expect(rippleElement.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
            });
        });
        describe('check ripple animation with multiple mousedown # ', function () {
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
                event_handler_1.EventHandler.trigger(rippleElement, 'mouseup', { target: rippleElement });
                event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
                event_handler_1.EventHandler.trigger(rippleElement, 'mouseup', { target: rippleElement });
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleElement.getAttribute('e-ripple')).not.toEqual(null);
            });
        });
        describe('check ripple effect after destroy # ', function () {
            var rippleElement1 = dom_1.createElement('div');
            var rippleFn1 = animation_1.ripple(rippleElement1);
            beforeAll(function (done) {
                event_handler_1.EventHandler.trigger(rippleElement1, 'mousedown', { target: rippleElement1 });
                event_handler_1.EventHandler.trigger(rippleElement1, 'mouseup', { target: rippleElement1 });
                setTimeout(function () {
                    rippleFn1();
                    done();
                }, 500);
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleElement1.getAttribute('e-ripple')).toEqual(null);
                expect(rippleElement1.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });
        describe('test ripple effect on selectors # ', function () {
            var rippleElement = dom_1.createElement('div', { id: '#ripple' });
            rippleElement.appendChild(dom_1.createElement('div', { className: 'apply', styles: 'width: 100px; height: 100px;' }));
            rippleElement.appendChild(dom_1.createElement('div', { className: 'ignore', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleElement);
            var rippleFn = animation_1.ripple(rippleElement, '.apply');
            describe('check ripple effect on valid selector # ', function () {
                var apply = document.getElementsByClassName('apply')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: apply });
                    event_handler_1.EventHandler.trigger(rippleElement, 'mouseup', { target: apply });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply.className.indexOf('e-ripple')).not.toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
                });
            });
            describe('check ripple effect on invalid selector # ', function () {
                var ignore = document.getElementsByClassName('ignore')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: ignore });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            describe('check ripple attributes on destroy # ', function () {
                var apply = document.getElementsByClassName('ignore')[0];
                beforeEach(function () {
                    rippleFn();
                    event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: apply });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(rippleElement.getAttribute('e-ripple')).toEqual(null);
                    expect(apply.className.indexOf('e-ripple')).toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            describe('check ripple with invalid element # ', function () {
                var unkown = dom_1.createElement('div');
                beforeEach(function () {
                    animation_1.ripple(rippleElement);
                    event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: unkown });
                    event_handler_1.EventHandler.trigger(rippleElement, 'mouseup', { target: unkown });
                });
                it('test unkonw element', function () {
                    expect(rippleElement.getAttribute('e-ripple')).not.toEqual(null);
                });
            });
            describe('check ripple with mouse move event # ', function () {
                beforeEach(function () {
                    animation_1.ripple(rippleElement);
                });
                describe('without ripple effect # ', function () {
                    beforeEach(function () {
                        event_handler_1.EventHandler.trigger(rippleElement, 'mousemove', { target: rippleElement });
                    });
                    it('test unkonw element', function () {
                        expect(rippleElement.className.indexOf('e-ripple')).toEqual(-1);
                    });
                });
                describe('with ripple effect # ', function () {
                    beforeEach(function () {
                        event_handler_1.EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
                        event_handler_1.EventHandler.trigger(rippleElement, 'mousemove', { target: rippleElement });
                    });
                    it('test unkonw element', function () {
                        expect(rippleElement.className.indexOf('e-ripple')).not.toEqual(-1);
                    });
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleElement);
            });
        });
    });
});
