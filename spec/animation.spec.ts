import { createElement, select } from '../src/dom';
import { EventHandler } from '../src/event-handler';
import { Animation, AnimationOptions, ripple } from '../src/animation';

/**
 * Animation specification
 */

let animeObj: Animation = new Animation({});
let modifiedObj: Animation = new Animation({
    name: 'FadeOut', duration: 100, timingFunction: 'easeIn', delay: 1
});
let element1: HTMLElement = createElement('div', { id: 'anime1' });
let element2: HTMLElement = createElement('div', { id: 'anime2' });

//Cover onPropertyChanged function
animeObj.onPropertyChanged({}, {});

describe('Animation # ', () => {
    it('initialize animation object # ', () => {
        expect(animeObj instanceof Animation).toEqual(true);
    });

    it('check default name # ', () => {
        expect(animeObj.name).toEqual('FadeIn');
    });

    it('check default duration # ', () => {
        expect(animeObj.duration).toEqual(400);
    });

    it('check default timingFunction # ', () => {
        expect(animeObj.timingFunction).toEqual('ease');
    });

    it('check default timingFunction value # ', () => {
        expect(animeObj.easing[animeObj.timingFunction]).toEqual('cubic-bezier(0.250, 0.100, 0.250, 1.000)');
    });

    it('check default delay # ', () => {
        expect(animeObj.delay).toEqual(0);
    });

    it('check modified name # ', () => {
        expect(modifiedObj.name).toEqual('FadeOut');
    });

    it('check modified duration # ', () => {
        expect(modifiedObj.duration).toEqual(100);
    });

    it('check modified timingFunction # ', () => {
        expect(modifiedObj.timingFunction).toEqual('easeIn');
    });

    it('check modified delay # ', () => {
        expect(modifiedObj.delay).toEqual(1);
    });

    it('check modified animation options with default animation options # ', () => {
        expect(modifiedObj).not.toEqual(animeObj);
    });

    it('check module name # ', () => {
        expect(animeObj.getModuleName()).toEqual('animation');
    });

    it('check notify property change # ', () => {
        modifiedObj.timingFunction = 'cubic-bezier(.29,0,.55,1)';
        expect(modifiedObj.timingFunction).toEqual('cubic-bezier(.29,0,.55,1)');
    });

    it('animate method without options # ', (done: Function) => {
        let animationObj: Animation = new Animation({});
        animationObj.end = (model: AnimationOptions) => {
            expect(model.element).toEqual(element1);
            done();
        };
        animationObj.animate(element1);
    });

    describe('animate method with id # ', () => {
        let animeOption: AnimationOptions = null;
        beforeEach((done: () => void) => {
            document.body.appendChild(element1);
            animeObj.animate('#anime1', {
                timingFunction: 'easeIn', end: (args: AnimationOptions): void => {
                    animeOption = args;
                    done();
                }
            });
        });

        it('testing callback option # ', () => {
            select('#anime1').remove();
            expect(animeOption).not.toBeNull();
        });
    });

    describe('animate method with element # ', () => {
        let animeOption: AnimationOptions = null;
        beforeEach((done: () => void) => {
            modifiedObj.animate(element1, {
                end: (args: AnimationOptions): void => {
                    animeOption = args;
                    done();
                }
            });
        });

        it('testing callback option # ', () => {
            expect(animeOption).not.toBeNull();
        });
    });

    describe('animate method with failure # ', () => {
        let error: AnimationOptions = null;
        beforeEach((done: () => void) => {
            let raf: (callback: FrameRequestCallback) => number = window.requestAnimationFrame;
            window.requestAnimationFrame = undefined;
            modifiedObj.animate(element2, {
                fail: (e: AnimationOptions): void => {
                    window.requestAnimationFrame = raf;
                    error = e;
                    done();
                }
            });
        });

        it('testing promise catch # ', () => {
            expect(error).not.toBeNull();
        });
    });

    describe('animate method with progress # ', () => {
        let animeOption: AnimationOptions = null;
        beforeEach((done: () => void) => {
            modifiedObj.animate(element2, {
                progress: (args: AnimationOptions): void => {
                    animeOption = args;
                    done();
                }
            });
        });

        it('expected animation object # ', () => {
            expect(animeOption).not.toBeNull();
        });
        afterAll(() => {
            modifiedObj.destroy();
        });
    });


    describe('EJ2-499: delay time is greater than duration time # ', () => {
        let animeOption: AnimationOptions = null;
        beforeEach((done: () => void) => {
            animeObj.animate(element1, {
                delay: 1000, duration: 100,
                progress: (args: AnimationOptions): void => {
                    if (args.timeStamp > args.duration / 2) {
                        animeOption = args;
                        done();
                    }
                }
            });
        });

        it('testing delay time is greater than duration time with animate method # ', () => {
            expect(animeOption).not.toBeNull();
        });
    });

    describe('EJ2-594: animation for svg elements in IE browser # ', () => {
        let animeAttr: string = null;
        let element: HTMLElement = createElement('div', { id: 'anime' });
        describe('testing e-animate attribute # ', () => {
            beforeEach((done: () => void) => {
                animeObj.animate(element, {
                    progress: (args: AnimationOptions): void => {
                        if (args.timeStamp > (args.delay + args.duration) / 2) {
                            animeAttr = args.element.getAttribute('e-animate');
                            done();
                        }
                    }
                });
            });

            it('progress event # ', () => {
                expect(animeAttr).toEqual('true');
            });
        });

        describe('testing e-animate attribute # ', () => {
            beforeEach((done: () => void) => {
                animeObj.animate(element1, {
                    end: (args: AnimationOptions): void => {
                        animeAttr = args.element.getAttribute('e-animate');
                        done();
                    }
                });
            });

            it('animation end # ', () => {
                expect(animeAttr).toEqual(null);
            });
        });

        describe('EJ2-940: animate method with begin and animation end on last frame # ', () => {
            let animeOption: AnimationOptions = null;
            beforeEach((done: () => void) => {
                modifiedObj.animate(element2, {
                    begin: (args: AnimationOptions): void => {
                        animeOption = args;
                        done();
                    }
                });
            });

            it('expected animation object # ', () => {
                expect(animeOption).not.toBeNull();
            });

            afterAll(() => {
                modifiedObj.destroy();
            });
        });
    });

    describe('stop animation at inprogress # ', () => {
        describe('with element # ', () => {
            let element: HTMLElement = createElement('div', { id: 'anime' });
            let animationId: string = null;
            beforeEach((done: () => void) => {
                animeObj.animate(element, {
                    progress: (args: AnimationOptions): void => {
                        animationId = args.element.getAttribute('e-animation-id');
                        Animation.stop(args.element);
                        done();
                    }
                });
            });

            it('expected animation id # ', () => {
                expect(animationId).not.toBeNull();
            });
        });

        describe('with model # ', () => {
            let element: HTMLElement = createElement('div', { id: 'anime' });
            let timeStamp: number = null;
            beforeEach((done: () => void) => {
                animeObj.animate(element, {
                    duration: 600,
                    progress: (args: AnimationOptions): void => {
                        if (args.timeStamp > 300) {
                            Animation.stop(args.element, args);
                        }
                    },
                    end: (args: AnimationOptions): void => {
                        timeStamp = args.timeStamp;
                        done();
                    }
                });
            });

            it('expected timestamp with less than actual duration # ', () => {
                expect(timeStamp < 400).toEqual(true);
            });
        });

        it('with out animate method # ', () => {
            let element: HTMLElement = createElement('div', {
                id: 'anime',
                attrs: { 'e-animate': 'true' }
            });
            Animation.stop(element);
            expect(element.getAttribute('e-animate')).toBeNull();
        });
    });
});

let rippleElement: HTMLElement = createElement('div', { id: 'ripple' });
let rippleFn: Function = ripple(rippleElement);
describe('Ripple # ', () => {
    describe('check ripple animation # ', () => {
        beforeAll(() => {
            EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
        });
        it('test e-ripple attribute on ripple element', () => {
            expect(rippleElement.getAttribute('e-ripple')).not.toEqual(null);
            expect(rippleElement.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
        });
    });

    describe('check ripple animation with multiple mousedown # ', () => {
        beforeAll(() => {
            EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
            EventHandler.trigger(rippleElement, 'mouseup', { target: rippleElement });
            EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
            EventHandler.trigger(rippleElement, 'mouseup', { target: rippleElement });
        });
        it('test e-ripple attribute on ripple element', () => {
            expect(rippleElement.getAttribute('e-ripple')).not.toEqual(null);
        });
    });

    describe('check ripple effect after destroy # ', () => {
        let rippleElement1: HTMLElement = createElement('div');
        let rippleFn1: Function = ripple(rippleElement1);
        beforeAll((done: () => void) => {
            EventHandler.trigger(rippleElement1, 'mousedown', { target: rippleElement1 });
            EventHandler.trigger(rippleElement1, 'mouseup', { target: rippleElement1 });
            setTimeout(() => {
                rippleFn1();
                done();
            }, 500);
        });
        it('test e-ripple attribute on ripple element', () => {
            expect(rippleElement1.getAttribute('e-ripple')).toEqual(null);
            expect(rippleElement1.getElementsByClassName('e-ripple-element').length).toEqual(0);
        });
    });

    describe('test ripple effect on selectors # ', () => {
        let rippleElement: HTMLElement = createElement('div', { id: '#ripple' });
        rippleElement.appendChild(createElement('div', { className: 'apply', styles: 'width: 100px; height: 100px;' }));
        rippleElement.appendChild(createElement('div', { className: 'ignore', styles: 'width: 100px; height: 100px;' }));
        document.body.appendChild(rippleElement);
        let rippleFn: Function = ripple(rippleElement, '.apply');
        describe('check ripple effect on valid selector # ', () => {
            let apply: HTMLElement = <HTMLElement>document.getElementsByClassName('apply')[0];
            beforeEach(() => {
                EventHandler.trigger(rippleElement, 'mousedown', { target: apply });
                EventHandler.trigger(rippleElement, 'mouseup', { target: apply });
            });
            it('test e-ripple attribute on selector element', () => {
                expect(apply.className.indexOf('e-ripple')).not.toEqual(-1);
                expect(apply.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
            });
        });

        describe('check ripple effect on invalid selector # ', () => {
            let ignore: HTMLElement = <HTMLElement>document.getElementsByClassName('ignore')[0];
            beforeEach(() => {
                EventHandler.trigger(rippleElement, 'mousedown', { target: ignore });
            });
            it('test e-ripple attribute on selector element', () => {
                expect(ignore.className.indexOf('e-ripple')).toEqual(-1);
                expect(ignore.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });

        describe('check ripple attributes on destroy # ', () => {
            let apply: HTMLElement = <HTMLElement>document.getElementsByClassName('ignore')[0];
            beforeEach(() => {
                rippleFn();
                EventHandler.trigger(rippleElement, 'mousedown', { target: apply });
            });
            it('test e-ripple attribute on selector element', () => {
                expect(rippleElement.getAttribute('e-ripple')).toEqual(null);
                expect(apply.className.indexOf('e-ripple')).toEqual(-1);
                expect(apply.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });

        describe('check ripple with invalid element # ', () => {
            let unkown: HTMLElement = createElement('div');
            beforeEach(() => {
                ripple(rippleElement);
                EventHandler.trigger(rippleElement, 'mousedown', { target: unkown });
                EventHandler.trigger(rippleElement, 'mouseup', { target: unkown });
            });
            it('test unkonw element', () => {
                expect(rippleElement.getAttribute('e-ripple')).not.toEqual(null);
            });
        });

        describe('check ripple with mouse move event # ', () => {
            beforeEach(() => {
                ripple(rippleElement);
            });

            describe('without ripple effect # ', () => {
                beforeEach(() => {
                    EventHandler.trigger(rippleElement, 'mousemove', { target: rippleElement });
                });

                it('test unkonw element', () => {
                    expect(rippleElement.className.indexOf('e-ripple')).toEqual(-1);
                });
            });

            describe('with ripple effect # ', () => {
                beforeEach(() => {
                    EventHandler.trigger(rippleElement, 'mousedown', { target: rippleElement });
                    EventHandler.trigger(rippleElement, 'mousemove', { target: rippleElement });
                });

                it('test unkonw element', () => {
                    expect(rippleElement.className.indexOf('e-ripple')).not.toEqual(-1);
                });
            });
            
        });

        afterAll(() => {
            document.body.removeChild(rippleElement);
        });
    });
});
