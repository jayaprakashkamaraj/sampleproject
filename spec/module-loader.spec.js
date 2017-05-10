define(["require", "exports", "../src/dom", "./component.spec", "../src/touch", "../src/animation", "../src/util"], function (require, exports, dom_1, component_spec_1, touch_1, animation_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('ModuleLoader inject modules', function () {
        describe('Different modules injection', function () {
            it('Required modules without module declaration', function () {
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    return [];
                };
                component_spec_1.Styler1.Inject();
                var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
                document.body.appendChild(elem);
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv0');
                expect(styleObj.getInjectedModules().indexOf(animation_1.Animation)).toBe(-1);
                styleObj.destroy();
                document.body.innerHTML = '';
            });
            it('Injected modules without module declaration', function () {
                var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
                document.body.appendChild(elem);
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    return [{ args: [elem], member: 'touch' }];
                };
                component_spec_1.Styler1.Inject();
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv0');
                expect(styleObj.getInjectedModules().indexOf(touch_1.Touch)).toBe(-1);
                styleObj.destroy();
                document.body.innerHTML = '';
            });
            it('Difference injected modules with required modules', function () {
                component_spec_1.Styler1.Inject(animation_1.Animation);
                var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
                document.body.appendChild(elem);
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv0');
                expect(styleObj.getInjectedModules().indexOf(touch_1.Touch)).toBe(-1);
                styleObj.destroy();
                document.body.innerHTML = '';
            });
        });
        describe('Check property declarations', function () {
            it('Testing without isProperty module declaration', function () {
                var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
                document.body.appendChild(elem);
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    return [{ args: [elem], member: 'touch' }];
                };
                component_spec_1.Styler1.Inject(touch_1.Touch);
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv0');
                expect(util_1.getValue('touchModule', styleObj) instanceof touch_1.Touch).toEqual(true);
                styleObj.destroy();
                document.body.innerHTML = '';
            });
            it('Testing with isProperty module declaration', function () {
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    return [{ args: [elem], member: 'animation', isProperty: true }];
                };
                var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
                document.body.appendChild(elem);
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv0');
                expect(util_1.getValue('animationModule', styleObj)).toEqual(animation_1.Animation);
                styleObj.destroy();
                document.body.innerHTML = '';
            });
        });
        describe('Dynamic module loading and unloading on property  value changed', function () {
            var dynamicLoad;
            beforeAll(function (done) {
                var elem = dom_1.createElement('div', { id: 'myStyleDiv0' });
                document.body.appendChild(elem);
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    var ret = [];
                    if (this.enableTouch) {
                        ret.push({ args: [elem], member: 'touch' });
                    }
                    ret.push({ args: [elem], member: 'animation' });
                    return ret;
                };
                dynamicLoad = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv0');
                setTimeout(function () { done(); }, 50);
            });
            describe('', function () {
                it('check by default modules are loaded based on property value', function () {
                    expect(util_1.getValue('animationModule', dynamicLoad) instanceof animation_1.Animation).toEqual(true);
                    expect(util_1.getValue('touchModule', dynamicLoad) instanceof touch_1.Touch).toEqual(true);
                });
            });
            describe('Unload  and load module while property value changed', function () {
                beforeAll(function (done) {
                    dynamicLoad.enableTouch = false;
                    setTimeout(function () { done(); }, 50);
                });
                describe('unload', function () {
                    it('Check whether the touch module is removed', function () {
                        expect(dynamicLoad.hasOwnProperty('touchModule')).toBe(false);
                    });
                    it('check the loaded modules length', function () {
                        expect(dynamicLoad.moduleLoader.loadedModules.length).toBe(1);
                    });
                });
                describe('load', function () {
                    beforeAll(function (done) {
                        dynamicLoad.enableTouch = true;
                        setTimeout(function () { done(); }, 50);
                    });
                    it('check touch module is added', function () {
                        expect(util_1.getValue('animationModule', dynamicLoad) instanceof animation_1.Animation).toEqual(true);
                        expect(util_1.getValue('touchModule', dynamicLoad) instanceof touch_1.Touch).toEqual(true);
                    });
                    it('check the loaded modules length', function () {
                        expect(dynamicLoad.moduleLoader.loadedModules.length).toBe(2);
                    });
                });
                describe('Refresh inject modules not add duplicate loaded modules', function () {
                    beforeAll(function (done) {
                        dynamicLoad.size = '23px';
                        setTimeout(function () { done(); }, 50);
                    });
                    it('', function () {
                        expect(dynamicLoad.moduleLoader.loadedModules.length).toBe(2);
                    });
                });
                describe('Property change with databind calling', function () {
                    it('', function () {
                        dynamicLoad.enableTouch = false;
                        dynamicLoad.dataBind();
                        expect(dynamicLoad.moduleLoader.loadedModules.length).toBe(1);
                        expect(dynamicLoad.hasOwnProperty('touchModule')).toBe(false);
                    });
                });
            });
            afterAll(function () {
                document.body.innerHTML = '';
            });
        });
        describe('Clean loaded modules', function () {
            it('after clean', function () {
                var elem = dom_1.createElement('div', { id: 'myStyleDiv1' });
                document.body.appendChild(elem);
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    return [{ args: [elem], member: 'touch' }];
                };
                component_spec_1.Styler1.Inject(touch_1.Touch);
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv1');
                spyOn(touch_1.Touch.prototype, 'destroy');
                expect(touch_1.Touch.prototype.destroy).not.toHaveBeenCalled();
                styleObj.destroy();
                document.body.innerHTML = '';
                expect(touch_1.Touch.prototype.destroy).toHaveBeenCalled();
            });
        });
        describe('Multiple injection', function () {
            it('testing duplicates', function () {
                var elem = dom_1.createElement('div', { id: 'myStyleDiv1' });
                document.body.appendChild(elem);
                component_spec_1.Styler1.prototype.requiredModules = function () {
                    return [{ args: [elem], member: 'touch' }, { args: [elem], member: 'animation', isProperty: true }];
                };
                component_spec_1.Styler1.Inject(touch_1.Touch);
                component_spec_1.Styler1.Inject(touch_1.Touch, animation_1.Animation);
                var styleObj = new component_spec_1.Styler1({ size: '20px' }, '#myStyleDiv1');
                expect(util_1.getValue('touchModule', styleObj)).not.toEqual(undefined);
                styleObj.destroy();
                document.body.innerHTML = '';
            });
        });
        afterAll(function () {
            component_spec_1.Styler1.prototype.injectedModules = [];
        });
    });
});
