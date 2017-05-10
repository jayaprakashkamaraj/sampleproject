define(["require", "exports", "../src/svg-renderer"], function (require, exports, svg_renderer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function checkAttributes(element, options) {
        var result;
        var i;
        var keys = Object.keys(options);
        var values = Object.keys(options).map(function (key) { return options[key]; });
        for (i = 0; i < keys.length; i++) {
            result = true;
            if (values[i].toString() !== element.getAttribute(keys[i])) {
                result = false;
                break;
            }
        }
        return result;
    }
    describe('SVG element', function () {
        it('SVG attributes test by passing args', function () {
            var options = {
                'width': 200,
                'height': 200
            };
            var render = new svg_renderer_1.SvgRenderer('');
            render.height = 500;
            render.width = 500;
            var element = render.createSvg(options);
            expect(element.attributes[0].value).toEqual('500');
            expect(element.attributes[1].value).toEqual('500');
        });
        it('SVG attributes test without passing args', function () {
            var root = document.createElement('div');
            root.setAttribute('id', 'container');
            document.body.appendChild(root);
            var render = new svg_renderer_1.SvgRenderer('container');
            var svg = document.createElementNS(this.svgLink, 'svg');
            svg.setAttribute('id', 'container_svg');
            root.appendChild(svg);
            var element = render.createSvg({});
            expect(element.attributes[2].value).toEqual('450');
            root.parentNode.removeChild(root);
        });
    });
    describe('SVG Rendering', function () {
        beforeEach(function () {
            this.render = new svg_renderer_1.SvgRenderer('');
            this.SVGEle = this.render.createSvg({ id: 'container_svg', width: 600, height: 100 });
            document.body.appendChild(this.SVGEle);
        });
        describe('Circle', function () {
            it('Create circle element test', function () {
                var options = {
                    'id': 'container_circle',
                    'cx': 10,
                    'cy': 10,
                    'r': 50,
                    'fill': 'blue',
                    'stroke': '#2988d6',
                    'stroke-width': 2
                };
                var element = this.render.drawCircle(options);
                this.SVGEle.appendChild(element);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
            it('Update circle element attributes test', function () {
                var options = {
                    'id': 'container_circle',
                    'cx': 20,
                    'cy': 20,
                    'r': 40,
                    'fill': 'red',
                    'stroke': '#2988d6',
                    'stroke-width': 1
                };
                var element = this.render.drawCircle(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Rectangle', function () {
            it('Create rectangle element test', function () {
                var options = {
                    'id': 'container_rect',
                    'x': 20,
                    'y': 20,
                    'width': 50,
                    'height': 50,
                    'fill': 'red',
                    'stroke': 'black',
                    'stroke-width': 2
                };
                var element = this.render.drawRectangle(options);
                this.SVGEle.appendChild(element);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
            it('Update rectangle element attributes test', function () {
                var options = {
                    'id': 'container_rect',
                    'x': 10,
                    'y': 10,
                    'width': 100,
                    'height': 70,
                    'fill': 'green',
                    'stroke': 'black',
                    'stroke-width': 1
                };
                var element = this.render.drawRectangle(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Line', function () {
            it('Create Line element test', function () {
                var options = {
                    'id': 'container_line',
                    'x1': 10,
                    'y1': 10,
                    'x2': 100,
                    'y2': 100,
                    'fill': 'red',
                    'stroke-width': 2,
                    'stroke': 'blue'
                };
                var element = this.render.drawLine(options);
                this.SVGEle.appendChild(element);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
            it('Update line element attributes test', function () {
                var options = {
                    'id': 'container_line',
                    'x1': 0,
                    'y1': 0,
                    'x2': 90,
                    'y2': 110,
                    'fill': 'blue',
                    'stroke-width': 3,
                    'stroke': 'blue'
                };
                var element = this.render.drawLine(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Path', function () {
            it('Create Path element test', function () {
                var options = {
                    'id': 'container_path',
                    'fill': 'green',
                    'opacity': 0.5,
                    'stroke': 'black',
                    'stroke-width': 3,
                    'd': 'M50 0 L75 100 L125 100 Z'
                };
                var element = this.render.drawPath(options);
                var result = checkAttributes(element, options);
                this.SVGEle.appendChild(element);
                expect(result).toBe(true);
            });
            it('Update path element attributes test', function () {
                var options = {
                    'id': 'container_path',
                    'fill': 'red',
                    'opacity': 0.8,
                    'stroke': 'red',
                    'stroke-width': 1,
                    'd': 'M55 0 L95 120 L105 50 Z'
                };
                var element = this.render.drawPath(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Polyline', function () {
            it('Create polyline element test', function () {
                var options = {
                    'id': 'container_polyline',
                    'fill': 'green',
                    'stroke': 'red',
                    'stroke-width': 2,
                    'points': '20,20 40,25 60,40 80,120 120,140 200,180'
                };
                var element = this.render.drawPolyline(options);
                var result = checkAttributes(element, options);
                this.SVGEle.appendChild(element);
                expect(result).toBe(true);
            });
            it('Update polyline element attributes test', function () {
                var options = {
                    'id': 'container_polyline',
                    'fill': 'red',
                    'stroke': 'green',
                    'stroke-width': 3,
                    'points': '10,10 30,55 40,50 60,100 100,120 190,190'
                };
                var element = this.render.drawPolyline(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Ellipse', function () {
            it('Create ellipse element test', function () {
                var options = {
                    'id': 'container_ellipse',
                    'cx': 200,
                    'cy': 80,
                    'rx': 100,
                    'ry': 50,
                    'fill': 'yellow',
                    'stroke': 'white',
                    'stroke-width': 2
                };
                var element = this.render.drawEllipse(options);
                var result = checkAttributes(element, options);
                this.SVGEle.appendChild(element);
                expect(result).toBe(true);
            });
            it('Update ellipse attributes test', function () {
                var options = {
                    'id': 'container_ellipse',
                    'cx': 100,
                    'cy': 40,
                    'rx': 200,
                    'ry': 80,
                    'fill': 'blue',
                    'stroke': 'red',
                    'stroke-width': 1
                };
                var element = this.render.drawEllipse(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Polygon', function () {
            it('Create polygon element test', function () {
                var options = {
                    'id': 'container_polygon',
                    'fill': 'green',
                    'stroke': 'red',
                    'stroke-width': 2,
                    'points': '200,10 250,190 160,210'
                };
                var element = this.render.drawPolygon(options);
                var result = checkAttributes(element, options);
                this.SVGEle.appendChild(element);
                expect(result).toBe(true);
            });
            it('Update polygon element attributes test', function () {
                var options = {
                    'id': 'container_polygon',
                    'fill': 'red',
                    'stroke': 'black',
                    'stroke-width': 3,
                    'points': '100,30 150,290 260,110'
                };
                var element = this.render.drawPolygon(options);
                var result = checkAttributes(element, options);
                element.remove();
                expect(result).toBe(true);
            });
        });
        describe('Text', function () {
            it('Create text element test', function () {
                var options = {
                    'id': 'container_text',
                    'x': 0,
                    'y': 15,
                    'fill': 'green'
                };
                var element = this.render.createText(options, 'test case');
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
                expect(element.textContent).toEqual('test case');
            });
            it('Content of the text element test', function () {
                var options = {
                    'id': 'container_text',
                    'x': 0,
                    'y': 15,
                    'fill': 'green'
                };
                var element = this.render.createText(options, null);
                expect(element.textContent).toEqual('');
            });
        });
        describe('TSpan', function () {
            it('Create tspan element test', function () {
                var options = {
                    'id': 'container_tspan',
                    'x': 0,
                    'y': 25,
                    'fill': 'red'
                };
                var element = this.render.createTSpan(options, 'test case');
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
                expect(element.textContent).toEqual('test case');
            });
            it('Content of the tspan element test', function () {
                var options = {
                    'id': 'container_tspan',
                    'x': 0,
                    'y': 25,
                    'fill': 'red'
                };
                var element = this.render.createTSpan(options, null);
                expect(element.textContent).toEqual('');
            });
        });
        describe('Title', function () {
            it('Title element attributes test', function () {
                var element = this.render.createTitle('Title text');
                expect(element.textContent).toEqual('Title text');
            });
        });
        describe('Defs', function () {
            it('Defs element attributes test', function () {
                var element = this.render.createDefs();
                expect(element.tagName).toEqual('defs');
            });
        });
        describe('ClipPath', function () {
            it('ClipPath element attributes test', function () {
                var element = this.render.createDefs();
                expect(element.tagName).toEqual('defs');
            });
        });
        describe('ForeignObject', function () {
            it('Foreign Object element attributes test', function () {
                var options = {
                    'x': 10,
                    'y': 20,
                    'width': 100,
                    'height': 100
                };
                var element = this.render.createForeignObject(options);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
        });
        describe('Group', function () {
            it('Group element attributes test', function () {
                var options = {
                    'fill': 'white',
                    'stroke': 'black',
                    'stroke-width': 5
                };
                var element = this.render.createGroup(options);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
        });
        describe('Pattern', function () {
            it('Pattern element attributes test', function () {
                var options = {
                    'patternUnits': 'userSpaceOnUse',
                    'width': 8,
                    'height': 8
                };
                var element = this.render.createPattern(options, 'pattern');
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
                expect(element.tagName).toEqual('pattern');
            });
        });
        describe('Image', function () {
            it('Image element attributes test', function () {
                var options = {
                    'height': 100,
                    'width': 200,
                    'href': '',
                    'id': '',
                    'clip-path': '',
                    'x': 0,
                    'y': 0,
                    'visibility': 'visible',
                    'preserveAspectRatio': 'none'
                };
                var element = this.render.drawImage(options);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
            it('Image element attributes test', function () {
                var options = {
                    'height': 100,
                    'width': 200,
                    'href': '',
                    'id': '',
                    'x': 0,
                    'y': 0,
                    'visibility': 'visible'
                };
                var element = this.render.drawImage(options);
                var result = checkAttributes(element, options);
                expect(result).toBe(true);
            });
        });
        describe('Radial Gradient', function () {
            it('Radial gradient test by passing array of colors', function () {
                var color = [{ color: 'green', colorStop: '0%' }, { color: 'blue', colorStop: '100%' }];
                var options = {
                    'cx': '50',
                    'cy': '50',
                    'r': '50',
                    'fx': '50',
                    'fy': '50'
                };
                expect(this.render.createRadialGradient(color, 'new', options)).toEqual('url(#_newradialGradient)');
            });
            it('Radial gradient test by passing a color', function () {
                var color = [{ color: 'green' }];
                var options = {
                    'cx': '50',
                    'cy': '50',
                    'r': '50',
                    'fx': '50',
                    'fy': '50'
                };
                expect(this.render.createRadialGradient(color, 'new', options)).toEqual('green');
            });
        });
        describe('Linear Gradient', function () {
            it('Linear gradient test by passing array of colors', function () {
                var color = [{ color: 'green', colorStop: '0%' }, { color: 'blue', colorStop: '100%' }];
                var options = {
                    'x1': '0',
                    'y1': '0',
                    'x2': '100',
                    'y2': '0'
                };
                expect(this.render.createLinearGradient(color, 'new', options)).toEqual('url(#_newlinearGradient)');
            });
            it('Linear gradient test by passing a color', function () {
                var color = [{ color: 'green' }];
                var options = {
                    'x1': '0',
                    'y1': '0',
                    'x2': '100',
                    'y2': '0'
                };
                expect(this.render.createLinearGradient(color, 'new', options)).toEqual('green');
            });
        });
        describe('DrawClipPath', function () {
            it('DrawClipPath method test', function () {
                var options = {
                    'x': 10,
                    'y': 10,
                    'width': 100,
                    'height': 100,
                    'fill': 'white',
                    'stroke-width': 1,
                    'stroke': 'gray'
                };
                var element = this.render.drawClipPath(options);
                var result = checkAttributes(element.childNodes[0].childNodes[0], options);
                expect(result).toBe(true);
            });
        });
        describe('DrawCircularClipPath', function () {
            it('DrawCircularClipPath method test', function () {
                var options = {
                    'cx': 10,
                    'cy': 10,
                    'r': 50,
                    'fill': 'blue',
                    'stroke': '#2988d6',
                    'stroke-width': 2
                };
                var element = this.render.drawCircularClipPath(options);
                var result = checkAttributes(element.childNodes[0].childNodes[0], options);
                expect(result).toBe(true);
            });
        });
    });
});
