define(["require", "exports", "../src/canvas-renderer", "../node_modules/canteen/build/canteen"], function (require, exports, canvas_renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Canvas element', function () {
        it('Canvas attributes test by passing args', function () {
            var options = {
                'width': 200,
                'height': 200
            };
            var render = new canvas_renderer_1.CanvasRenderer('');
            render.height = 500;
            render.width = 500;
            var element = render.createCanvas(options);
            expect(element.attributes[1].value).toEqual('500');
            expect(element.attributes[2].value).toEqual('500');
        });
        it('Canvas attributes test without passing args', function () {
            var root = document.createElement('div');
            root.setAttribute('id', 'container');
            document.body.appendChild(root);
            var render = new canvas_renderer_1.CanvasRenderer('container');
            var element = render.createCanvas({});
            expect(element.attributes[2].value).toEqual('450');
            root.parentNode.removeChild(root);
        });
        it('Canvas update attributes test', function () {
            var root = document.createElement('div');
            root.setAttribute('id', 'container');
            document.body.appendChild(root);
            var render = new canvas_renderer_1.CanvasRenderer('container');
            var element = render.createCanvas({});
            var options = {
                'cx': 10,
                'cy': 10,
                'r': 50,
                'fill': 'blue',
                'stroke': '#2988d6',
                'stroke-width': 2
            };
            render.drawCircle(options);
            render.updateCanvasAttributes({ height: '300' });
            expect(element.attributes[2].value).toEqual('300');
            root.parentNode.removeChild(root);
        });
        it('Canvas update attributes test with dataUrl as null', function () {
            var root = document.createElement('div');
            root.setAttribute('id', 'container');
            document.body.appendChild(root);
            var render = new canvas_renderer_1.CanvasRenderer('container');
            var element = render.createCanvas({});
            render.updateCanvasAttributes({ height: '300' });
            expect(element.attributes[2].value).toEqual('300');
            root.parentNode.removeChild(root);
        });
    });
    describe('Canvas rendering', function () {
        beforeEach(function () {
            this.canvas = new canvas_renderer_1.CanvasRenderer('');
            this.canvas.createCanvas({ width: 600, height: 100 });
        });
        describe('Circle', function () {
            it('Render circle in canvas test', function () {
                var options = {
                    'cx': 10,
                    'cy': 10,
                    'r': 50,
                    'fill': 'blue',
                    'stroke': '#2988d6',
                    'stroke-width': 2
                };
                this.canvas.drawCircle(options);
                expect(this.canvas.ctx.hash()).toEqual('0e80130e88a6c513be1921eda84f106a');
            });
            it('Render circle with dashArray in canvas test', function () {
                var options = {
                    'cx': 10,
                    'cy': 10,
                    'r': 50,
                    'fill': 'blue',
                    'stroke': '#2988d6',
                    'stroke-width': 2,
                    'stroke-dasharray': '2,4'
                };
                this.canvas.drawCircle(options);
                expect(this.canvas.ctx.hash()).toEqual('e1fb95b12288fc7072d39eff758ce961');
            });
        });
        describe('Rectangle', function () {
            it('Render rectangle in canvas test', function () {
                var options = {
                    'x': 20,
                    'y': 20,
                    'width': 50,
                    'height': 50,
                    'fill': 'red',
                    'stroke': 'black',
                    'stroke-width': 2
                };
                this.canvas.drawRectangle(options);
                expect(this.canvas.ctx.hash()).toEqual('bf33a2e5e7ce3fff81471c99112a87ce');
            });
            it('Render rectangle with dashArray in canvas test', function () {
                var options = {
                    'x': 20,
                    'y': 20,
                    'width': 50,
                    'height': 50,
                    'fill': 'none',
                    'stroke': 'black',
                    'stroke-width': 2,
                    'stroke-dasharray': '2,3'
                };
                this.canvas.drawRectangle(options);
                expect(this.canvas.ctx.hash()).toEqual('5ae7d855862ed976ba31b5d0fe407814');
            });
            it('Render rectangle with rx in canvas test', function () {
                var options = {
                    'x': 20,
                    'y': 20,
                    'width': 50,
                    'height': 50,
                    'fill': 'none',
                    'stroke': 'black',
                    'stroke-width': 2,
                    'rx': 3
                };
                this.canvas.drawRectangle(options);
                expect(this.canvas.ctx.hash()).toEqual('ad9439970ad93b839a253e43c7d6d7d8');
            });
            it('Render rectangle with rx value greater than its width test', function () {
                var options = {
                    'x': 20,
                    'y': 20,
                    'width': 8,
                    'height': 7,
                    'fill': 'red',
                    'stroke': 'black',
                    'stroke-width': 2,
                    'rx': 20
                };
                this.canvas.drawRectangle(options);
                expect(this.canvas.ctx.hash()).toEqual('5f5f32484b161bad89ea4bbdeb8f9fc1');
            });
        });
        describe('Line', function () {
            it('Render line in canvas test', function () {
                var options = {
                    'x1': 10,
                    'y1': 10,
                    'x2': 100,
                    'y2': 100,
                    'fill': 'red',
                    'stroke-width': 2,
                    'stroke': 'blue'
                };
                this.canvas.drawLine(options);
                expect(this.canvas.ctx.hash()).toEqual('20e266876769485297ff5de92d1f1df7');
            });
        });
        describe('Path', function () {
            it('Render path in canvas test', function () {
                var options = {
                    'id': 'container_path',
                    'fill': 'green',
                    'opacity': 0.5,
                    'stroke': 'black',
                    'stroke-width': 3,
                    'cx': 10,
                    'cy': 10,
                    'r': 50,
                    'd': 'M 152 113 A 217 217 0 0 1 123 101 L 123 218 z'
                };
                this.canvas.drawPath(options);
                expect(this.canvas.ctx.hash()).toEqual('a286de1b83301dd9352a18c25bf9875c');
            });
            it('Render path in canvas with dashArray and translate test', function () {
                var options = {
                    'id': 'container_path',
                    'fill': 'green',
                    'fill-opacity': 0.5,
                    'stroke': 'black',
                    'stroke-width': 3,
                    'stroke-dasharray': '2,3',
                    'cx': 10,
                    'cy': 10,
                    'r': 50,
                    'innerR': 2,
                    'd': 'M 152 113 A 217 217 0 0 1 123 101 A 117 117 0 0 1 123 105 L 123 218 z'
                };
                this.canvas.drawPath(options, [10, 20]);
                expect(this.canvas.ctx.hash()).toEqual('d2ccf2fd59bb3024d5c225a05d3b8de3');
            });
            it('Render path in canvas without innerR', function () {
                var options = {
                    'id': 'container_path',
                    'fill': 'green',
                    'fill-opacity': 0.5,
                    'stroke': 'black',
                    'stroke-width': 3,
                    'stroke-dasharray': '2,3',
                    'd': 'M 152 113 A 217 217 0 0 1 123 101 L 123 218 z',
                    'start': 1.57,
                    'end': 3.0
                };
                this.canvas.drawPath(options, [10, 20]);
                expect(this.canvas.ctx.hash()).toEqual('bdd5e90916c361ab73f42b6ec350f5d3');
            });
            it('Render path in canvas with curve', function () {
                var options = {
                    'id': 'container_path',
                    'fill-opacity': 0.5,
                    'stroke': 'black',
                    'stroke-width': 0,
                    'stroke-dasharray': '2,3',
                    'd': 'M 47.25 187 C 78 202 110 217 141.75 203 Z',
                    'start': 1.57,
                    'end': 3.0
                };
                this.canvas.drawPath(options, [10, 20]);
                expect(this.canvas.ctx.hash()).toEqual('15f87448600e7853f39dd4267872cf1e');
            });
        });
        describe('Polyline', function () {
            it('Render polyline in canvas test', function () {
                var options = {
                    'id': 'container_polyline',
                    'fill': 'green',
                    'stroke': 'red',
                    'stroke-width': 2,
                    'points': '20,20 40,25 60,40 80,120 120,140 200,180'
                };
                this.canvas.drawPolyline(options);
                expect(this.canvas.ctx.hash()).toEqual('44622fcb611aa253572723da2bc01216');
            });
        });
        describe('Ellipse', function () {
            it('Render ellipse in canvas test', function () {
                var options = {
                    'cx': 200,
                    'cy': 80,
                    'rx': 100,
                    'ry': 50,
                    'fill': 'yellow',
                    'stroke': 'white',
                    'stroke-width': 2
                };
                this.canvas.drawEllipse(options);
                expect(this.canvas.ctx.hash()).toEqual('77f6d5e1bd77757a653bbe850698507c');
            });
        });
        describe('Text', function () {
            it('Render a text in canvas test', function () {
                var options = {
                    'x': 0,
                    'y': 15,
                    'fill': 'green',
                    'font-family': 'Segoe UI',
                    'font-style': 'Normal',
                    'font-size': '12px',
                    'font-weight': 'Regular',
                    'color': 'black',
                    'opacity': 1
                };
                this.canvas.drawText(options, 'test case');
                expect(this.canvas.ctx.hash()).toEqual('15759d25188a7661f646457aa9feeea9');
            });
            it('Render a text in canvas with text anchor test', function () {
                var options = {
                    'x': 0,
                    'y': 15,
                    'fill': 'green',
                    'font-family': 'Segoe UI',
                    'font-style': 'Normal',
                    'font-size': '12px',
                    'color': 'black',
                    'text-anchor': 'middle',
                    'baseline': 'middle'
                };
                this.canvas.drawText(options, 'test case');
                expect(this.canvas.ctx.hash()).toEqual('463b2e80788a6f069be2e977d6635736');
            });
        });
        describe('Image', function () {
            it('Render image in canvas test', function () {
                var options = {
                    'x1': 10,
                    'y1': 10,
                    'x2': 100,
                    'y2': 100,
                    'fill': 'red',
                    'stroke-width': 2,
                    'stroke': 'blue'
                };
                this.canvas.drawLine(options);
                var imgOptions = {
                    'height': 100,
                    'width': 200,
                    'x': 0,
                    'y': 0,
                    'href': this.canvas.dataUrl
                };
                this.canvas.drawImage(imgOptions);
            });
            it('Render image without passing href test', function () {
                var imgOptions = {
                    'height': 100,
                    'width': 200,
                    'x': 0,
                    'y': 0,
                    'href': this.canvas.dataUrl
                };
                this.canvas.drawImage(imgOptions);
                expect(this.canvas.ctx.hash()).toEqual('a3e76ef51c00895565c89ea114f30b29');
            });
        });
        describe('Linear gradient', function () {
            it('Linear gradient test by passing array of colors', function () {
                var color = [{ color: 'green', colorStop: '0%' }, { color: 'blue', colorStop: '100%' }];
                this.canvas.createLinearGradient(color);
                expect(this.canvas.ctx.hash()).toEqual('d00e90b58e8e2d1bb2ce6c01e99eed0e');
            });
            it('Linear gradient test by passing a color', function () {
                var color = [{ color: 'blue' }];
                this.canvas.createLinearGradient(color);
                expect(this.canvas.ctx.hash()).toEqual('d751713988987e9331980363e24189ce');
            });
        });
        describe('Radial gradient', function () {
            it('Radial gradient test by passing array of colors', function () {
                var color = [{ color: 'green', colorStop: '0%' }, { color: 'blue', colorStop: '100%' }];
                this.canvas.createRadialGradient(color);
                expect(this.canvas.ctx.hash()).toEqual('a7af337e74bfcc984da26290d6c3496b');
            });
            it('Radial gradient test by passing a color', function () {
                var color = [{ color: 'blue' }];
                this.canvas.createRadialGradient(color);
                expect(this.canvas.ctx.hash()).toEqual('d751713988987e9331980363e24189ce');
            });
        });
    });
});
