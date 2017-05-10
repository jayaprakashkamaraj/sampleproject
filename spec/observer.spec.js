define(["require", "exports", "../src/observer"], function (require, exports, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var event1Spy;
    var event2Spy;
    var event3Spy;
    describe('Observable', function () {
        var instance;
        var evtName = ['event1'];
        var obj = { test: 'context' };
        var obj2 = { dynamicContext: 'dynamic' };
        beforeEach(function () {
            instance = new observer_1.Observer(obj);
            event1Spy = jasmine.createSpy('event1');
            event2Spy = jasmine.createSpy('event2');
            event3Spy = jasmine.createSpy('event3');
        });
        describe('on', function () {
            it('check private custom event using the on function works properly', function () {
                instance.on('event1', event2Spy);
                expect(instance.boundedEvents[evtName[0]].length).toBe(1);
                expect(instance.boundedEvents[evtName[0]][0].handler).toEqual(event2Spy);
            });
            it('handler not binded to event while handle is not valid', function () {
                var invalidHandler;
                instance.on('event2', invalidHandler);
                expect(instance.boundedEvents.hasOwnProperty('event2')).toBe(false);
            });
        });
        describe('on with multiple handlers', function () {
            beforeEach(function () {
                instance.on('event1', event1Spy);
                instance.on('event1', event2Spy);
                instance.on('event1', event3Spy);
            });
            it('All handlers are added proeprly to the event', function () {
                expect(instance.boundedEvents[evtName[0]].length).toBe(3);
            });
            it('check inserting duplicate handlers', function () {
                instance.on('event1', event1Spy);
                expect(instance.boundedEvents[evtName[0]].length).toBe(3);
            });
        });
        describe('off', function () {
            it('Removing all handlers', function () {
                instance.on('event1', event2Spy);
                instance.on('event1', event2Spy);
                instance.off('event1');
                expect(instance.boundedEvents[evtName[0]]).toBeUndefined();
            });
        });
        describe('off with multiple handlers', function () {
            it('Removing the specific handler form the list of handlers works proelry', function () {
                instance.on('event1', event1Spy);
                instance.on('event1', event2Spy);
                instance.off('event1', event1Spy);
                expect(instance.boundedEvents[evtName[0]].length).toBe(1);
                expect(instance.boundedEvents[evtName[0]][0].handler).toEqual(event2Spy);
            });
        });
        describe('off with invalid event Name', function () {
            it('Works properly', function () {
                instance.off('eventtest', event3Spy);
                expect(event3Spy).not.toHaveBeenCalled();
            });
        });
        describe('off with invalid handler', function () {
            it('Not removes the actual event handlers', function () {
                instance.on('event1', event1Spy);
                instance.off('event1', function () { return 'test'; });
                expect(instance.boundedEvents[evtName[0]].length).toBe(1);
            });
        });
        describe('notify', function () {
            it('check private custom event using the notify function works properly', function () {
                instance.on('event1', event2Spy);
                instance.notify('event1', { a: 2, b: 3 });
                expect(event2Spy).toHaveBeenCalledWith({ name: 'event1', a: 2, b: 3 });
            });
            describe('notify processing handler properly', function () {
                var inst = new observer_1.Observer();
                var sk = function () {
                    inst.off('eventskip', sk);
                };
                var eventsk1 = jasmine.createSpy('event1');
                var eventsk2 = jasmine.createSpy('event2');
                beforeAll(function () {
                    inst.on('eventskip', sk);
                    inst.on('eventskip', eventsk1);
                    inst.on('eventskip', eventsk2);
                    inst.notify('eventskip');
                });
                it('dont skip events ', function () {
                    expect(eventsk1).toHaveBeenCalled();
                    expect(eventsk2).toHaveBeenCalled();
                });
            });
        });
        describe('check the context set to the instance', function () {
            it('returns properly', function () {
                var value;
                var cntxt = function () { value = this; };
                instance.on('eventtest', cntxt);
                instance.notify('eventtest');
                expect(value).toEqual(obj);
            });
        });
        describe('check the context set using on method dynamically', function () {
            it('returns properly', function () {
                var value;
                var cntxt = function () { value = this; };
                instance.on('eventtest', cntxt, obj2);
                instance.notify('eventtest');
                expect(value).toEqual(obj2);
            });
        });
        describe('notify with multiple handlers', function () {
            beforeEach(function () {
                instance.on('event1', event1Spy);
                instance.on('event1', event2Spy);
                instance.on('event1', event3Spy);
            });
            it('multiple properties works properly', function () {
                instance.notify('event1');
                expect(event1Spy).toHaveBeenCalled();
                expect(event2Spy).toHaveBeenCalled();
                expect(event3Spy).toHaveBeenCalled();
            });
        });
        describe('Test instance without passsing context', function () {
            var instance1 = new observer_1.Observer();
            it('Event operations working fine', function () {
                instance1.on('event1', event1Spy);
                instance1.notify('event1', {});
                expect(event1Spy).toHaveBeenCalled();
            });
            it('Check the context in the handler', function () {
                var value;
                instance.on('eventcntxt', function () { value = this; });
                expect(value).toBeUndefined();
            });
        });
        describe('destroy', function () {
            it('Works properly', function () {
                instance.on('event1', event1Spy);
                instance.on('on', event2Spy);
                instance.on('event', event3Spy);
                instance.destroy();
                expect(instance.boundedEvents).toBeUndefined();
                expect(instance.context).toBeUndefined();
            });
        });
    });
});
