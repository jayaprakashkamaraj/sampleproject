define(["require", "exports", "../src/draggable", "../src/dom", "../src/util", "../src/event-handler", "../src/droppable", "../src/touch"], function (require, exports, draggable_1, dom_1, util_1, event_handler_1, droppable_1, touch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var eventstr = '__eventList';
    var element;
    function copyObject(source, destiation) {
        for (var prop in source) {
            destiation[prop] = source[prop];
        }
        return destiation;
    }
    function getElement(id, style, ihtml) {
        var element = dom_1.createElement('div', {
            id: !id ? 'drag1' : id, innerHTML: !ihtml ? '<div id="outer"><P>Draggable Text</P></div>' : ihtml,
            styles: !style ? 'border:1px solid black;width:300px;height:150px' : style, className: 'common'
        });
        document.body.appendChild(element);
        return element;
    }
    function setMouseCordinates(eventarg, x, y) {
        eventarg.pageX = x;
        eventarg.pageY = y;
        eventarg.clientX = x;
        eventarg.clientY = y;
        return eventarg;
    }
    function getEventObject(eventType, eventName) {
        var tempEvent = document.createEvent(eventType);
        tempEvent.initEvent(eventName, true, true);
        var returnObject = copyObject(tempEvent, {});
        returnObject.preventDefault = function () { return true; };
        return returnObject;
    }
    exports.getEventObject = getEventObject;
    describe('draggable', function () {
        describe('Initialize of draggable', function () {
            var instance;
            var eventlist;
            var events;
            var evt = ['touchstart', 'mousedown'];
            beforeAll(function () {
                element = getElement();
                instance = new draggable_1.Draggable(element);
                eventlist = element[eventstr];
                events = eventlist.events || [];
            });
            it('class name', function () {
                expect(element.classList.contains('e-control')).toBe(true);
                expect(element.classList.contains('e-draggable')).toBe(true);
            });
            it('check Event bind', function () {
                for (var i = 0; i < events.length; i++) {
                    var result = evt.indexOf(events[i].name) !== -1;
                    expect(result).toEqual(true);
                }
            });
            it('check element instance', function () {
                expect(element.ej2_instances[0].constructor.name).toBe('Draggable');
            });
            afterAll(function () {
                element.remove();
            });
        });
        describe('Check Mousedown event', function () {
            var mousedown = getEventObject('MouseEvents', 'mousedown');
            mousedown.pageX = 8;
            mousedown.pageY = 9;
            mousedown.clientX = 8;
            mousedown.clientY = 9;
            mousedown.screenX = 8;
            mousedown.screenY = 75;
            window['browserDetails'].isIE = false;
            beforeEach(function () {
                element = getElement();
                mousedown.target = mousedown.currentTarget = element;
            });
            it('Mouse down event with no handle,abort and default clone  option ', function () {
                var instance = new draggable_1.Draggable(element);
                mousedown.target = mousedown.currentTarget = element;
                event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                expect(instance.initialPosition).toEqual({ x: 8, y: 9 });
                expect(instance.relativeXPosition).toBeUndefined();
                expect(instance.relativeYPosition).toBeUndefined();
                instance.intDestroy(mousedown);
            });
            it('Mouse down with handle option and target as the handle element', function () {
                var instance = new draggable_1.Draggable(element, { handle: 'p' });
                var elem = document.getElementsByTagName('p')[0];
                mousedown.target = mousedown.currentTarget = elem;
                event_handler_1.EventHandler.trigger(elem, 'mousedown', mousedown);
                expect(instance.initialPosition).toEqual({ x: 8, y: 9 });
                instance.intDestroy(mousedown);
            });
            it('Mouse down with handle option and target as the inner element of handle element', function () {
                var instance = new draggable_1.Draggable(element, { handle: '#outer' });
                var elem = document.getElementsByTagName('p')[0];
                mousedown.target = mousedown.currentTarget = elem;
                event_handler_1.EventHandler.trigger(document.getElementById('outer'), 'mousedown', mousedown);
                expect(instance.initialPosition).toEqual({ x: 8, y: 9 });
                instance.intDestroy(mousedown);
            });
            it('Mouse down with handle option and target as the parent element', function () {
                var instance = new draggable_1.Draggable(element, { handle: 'p' });
                mousedown.target = mousedown.currentTarget = element;
                event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                expect(instance.initialPosition).toBe(undefined);
            });
            it('Mouse down with handle option and invalid target selector', function () {
                var instance = new draggable_1.Draggable(element, { handle: '#td' });
                mousedown.target = mousedown.currentTarget = element;
                event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                expect(instance.initialPosition).toEqual({ x: 8, y: 9 });
            });
            it('Mouse down with abort option and target as the aborted element', function () {
                var instance = new draggable_1.Draggable(element, { abort: 'p' });
                mousedown.target = mousedown.currentTarget = document.getElementsByTagName('p')[0];
                event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                expect(instance.initialPosition).toBe(undefined);
                instance.intDestroy(mousedown);
            });
            it('Mouse down with abort option and target as the parent element', function () {
                var instance = new draggable_1.Draggable(element, { abort: 'p' });
                mousedown.target = mousedown.currentTarget = element;
                event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                expect(instance.initialPosition).toEqual({ x: 8, y: 9 });
                instance.intDestroy(mousedown);
            });
            it('Mouse down without clone option stores the relative position of element', function () {
                var instance = new draggable_1.Draggable(element, { clone: false });
                mousedown.target = mousedown.currentTarget = element;
                event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                expect(instance.relativeXPosition).not.toBeUndefined();
                expect(instance.relativeYPosition).not.toBeUndefined();
                instance.intDestroy(mousedown);
            });
            afterEach(function () {
                element.remove();
                document.body.innerHTML = '';
            });
        });
        describe('check MouseMove event', function () {
            var mousedown = getEventObject('MouseEvents', 'mousedown');
            mousedown = setMouseCordinates(mousedown, 17, 13);
            var mousemove;
            beforeEach(function () {
                mousemove = getEventObject('MouseEvents', 'mousemove');
                mousemove = setMouseCordinates(mousemove, 17, 14);
            });
            describe('Drag Start', function () {
                var instance;
                var dragstartEvent;
                beforeEach(function () {
                    element = getElement();
                    mousedown.target = mousedown.currentTarget = element;
                    dragstartEvent = jasmine.createSpy('dragStart');
                    instance = new draggable_1.Draggable(element, { clone: false, dragStart: dragstartEvent, dragArea: '#ss' });
                    event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                    mousemove.srcElement = mousemove.targetElement = mousemove.toElement = element;
                });
                it('Check aria-grabbed attribute is added to the draggable element', function () {
                    expect(instance.element.getAttribute('aria-grabbed')).toBe('true');
                    instance.intDestroy(mousedown);
                });
                it('Drag start movement called properly based on the distance moved and without element cloning', function () {
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(document.body.classList.contains('e-prevent-select')).toBe(true);
                    expect(dragstartEvent).toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('Drag start movement called properly based on the distance moved and without element cloning', function () {
                    instance.clone = true;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragstartEvent).toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                    expect(document.body.classList.contains('e-prevent-select')).toBe(false);
                });
                it('Drag start with helper property works properly', function () {
                    instance.clone = true;
                    instance.helper = function () {
                        var ele = document.createElement('div');
                        ele.innerHTML = 'Helper element';
                        return ele;
                    };
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragstartEvent).toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('Drag start with helper property returns the proper target element', function () {
                    var temp;
                    var ele = document.createElement('div');
                    ele.innerHTML = 'Helper element';
                    instance.clone = true;
                    instance.helper = function () {
                        document.body.appendChild(ele);
                        return ele;
                    };
                    instance.dragStart = function (e) {
                        temp = e.target;
                    };
                    mousemove.target = ele;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(temp).not.toEqual(ele);
                    instance.intDestroy(mousedown);
                });
                it('Drag start with helper property works properly', function () {
                    instance.clone = true;
                    instance.helper = function () {
                        return null;
                    };
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragstartEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('Drag start movement prevented if distance moved is lesser than model distance value ', function () {
                    mousemove = setMouseCordinates(mousemove, 17, 13);
                    instance.dragArea = undefined;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragstartEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('Drag start event not triggered while model value is not set ', function () {
                    instance.dragArea = instance.dragStart = undefined;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragstartEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                afterEach(function () {
                    element.remove();
                });
            });
            describe('drag start with position attributes', function () {
                var ele;
                var mElement;
                var inst;
                var dragsEvent;
                var mdown = getEventObject('MouseEvents', 'mousedown');
                var mmove;
                beforeAll(function () {
                    var str = "<div id='dragarea' tabindex='1' style='border:1px solid magenta;height:400px;width:500px;position:absolute'>\n                         <div id ='dragEle' style='border:1px solid blue;height:40px;width:80px'>\"\n                        Draggable\n                        </div> </div>";
                    mElement = getElement('outer', null, str);
                    mdown = setMouseCordinates(mdown, 17, 13);
                    mmove = getEventObject('MouseEvents', 'mousemove');
                    mmove = setMouseCordinates(mousemove, 17, 14);
                    ele = mElement.querySelector('#dragEle');
                    dragsEvent = jasmine.createSpy('dragStart');
                    inst = new draggable_1.Draggable(ele, { clone: false, dragStart: dragsEvent });
                    event_handler_1.EventHandler.trigger(ele, 'mousedown', mdown);
                    mmove.srcElement = mmove.targetElement = mmove.toElement = ele;
                });
                it('Drag start event triggers properly', function () {
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mmove);
                    expect(dragsEvent).toHaveBeenCalled();
                    inst.intDestroy(mdown);
                });
                afterAll(function () {
                    mElement.remove();
                });
            });
            describe('drag start with position relative set to the parent element', function () {
                var ele;
                var mElement;
                var inst;
                var dragsEvent;
                var mdown = getEventObject('MouseEvents', 'mousedown');
                var mmove;
                beforeAll(function () {
                    var str = "<div id ='dragEle' style='border: 1px solid; height: 300px; width: 200px;'>\n                        Draggable\n                        </div> ";
                    mElement = getElement('outer', "border:1px solid greenyellow;height:500px;\n                width:400px;padding:50px;margin-top:5px;position:relative", str);
                    mdown = setMouseCordinates(mdown, 67, 69);
                    mmove = getEventObject('MouseEvents', 'mousemove');
                    mmove = setMouseCordinates(mousemove, 76, 80);
                    ele = mElement.querySelector('#dragEle');
                    dragsEvent = jasmine.createSpy('dragStart');
                    inst = new draggable_1.Draggable(ele, { clone: false, dragStart: dragsEvent });
                    event_handler_1.EventHandler.trigger(ele, 'mousedown', mdown);
                    mmove.srcElement = mmove.targetElement = mmove.toElement = ele;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mmove);
                });
                it('Drag start event triggers properly', function () {
                    expect(ele.offsetTop).toBeGreaterThan(20);
                    expect(ele.offsetLeft).toBeGreaterThan(30);
                    expect(dragsEvent).toHaveBeenCalled();
                    inst.intDestroy(mdown);
                });
                afterAll(function () {
                    mElement.remove();
                });
            });
            describe('drag start dragTarget', function () {
                var ele;
                var mElement;
                var inst;
                var dragsEvent;
                var mdown = getEventObject('MouseEvents', 'mousedown');
                var mmove;
                beforeEach(function () {
                    var str = "<div id='dragarea' tabindex='1' style='border:1px solid magenta;height:400px;width:500px'>\n                    <div id ='dragEle' class='dragTarget' style='border:1px solid blue;height:40px;width:80px'>\n                     Draggable\n                    </div> </div>";
                    mElement = getElement('outer', null, str);
                    mdown = setMouseCordinates(mdown, 24, 15);
                    mmove = getEventObject('MouseEvents', 'mousemove');
                    mmove = setMouseCordinates(mousemove, 24, 18);
                    ele = mElement.querySelector('#dragarea');
                    dragsEvent = jasmine.createSpy('dragStart');
                    inst = new draggable_1.Draggable(ele, { clone: true, dragStart: dragsEvent, dragTarget: '.dragTarget' });
                    event_handler_1.EventHandler.trigger(ele, 'mousedown', mdown);
                    mmove.srcElement = mmove.target = mElement.querySelector('.dragTarget');
                });
                it('Drag start event triggers properly', function () {
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mmove);
                    expect(dragsEvent).toHaveBeenCalled();
                    expect(inst.diffX).toBe(14);
                    expect(inst.diffY).toBe(8);
                    inst.intDestroy(mdown);
                });
                it('Invalid dragTarget', function () {
                    inst.dragTarget = '.test';
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mmove);
                    expect(dragsEvent).toHaveBeenCalled();
                    inst.intDestroy(mdown);
                });
                afterAll(function () {
                    mElement.remove();
                });
            });
            describe('drag start with multiple touch points', function () {
                var ele;
                var mElement;
                var inst;
                var dragsEvent;
                var mdown = getEventObject('MouseEvents', 'mousedown');
                var mmove;
                beforeEach(function () {
                    var str = "<div id='dragarea' tabindex='1' style='border:1px solid magenta;height:400px;width:500px'>\n                     <div id ='dragEle' class='dragTarget' style='border:1px solid blue;height:40px;width:80px'>\n                       Draggable\n                     </div> </div>";
                    mElement = getElement('outer', null, str);
                    mdown = setMouseCordinates(mdown, 24, 15);
                    mmove = getEventObject('MouseEvents', 'mousemove');
                    ele = mElement.querySelector('#dragarea');
                    dragsEvent = jasmine.createSpy('dragStart');
                    inst = new draggable_1.Draggable(ele, { clone: true, dragStart: dragsEvent, dragTarget: '.dragTarget' });
                    event_handler_1.EventHandler.trigger(ele, 'mousedown', mdown);
                    mmove.srcElement = mmove.target = mElement.querySelector('.dragTarget');
                });
                it('Drag start event triggers properly', function () {
                    var dMouseDown = util_1.extend({}, mmove);
                    dMouseDown.changedTouches = [{}, {}];
                    event_handler_1.EventHandler.trigger((document), 'mousemove', dMouseDown);
                    expect(dragsEvent).not.toHaveBeenCalled();
                    expect(inst.diffX).toBe(0);
                    expect(inst.diffY).toBe(0);
                    inst.intDestroy(mdown);
                });
                afterAll(function () {
                    mElement.remove();
                });
            });
            describe('Set Drag area', function () {
                var instance;
                var outerEle;
                beforeEach(function () {
                    element = dom_1.createElement('div', {
                        id: 'drag', innerHTML: '<P>Draggable Text</P>',
                        styles: 'border:1px solid black;width:300px;height:150px'
                    });
                    outerEle = dom_1.createElement('div', {
                        id: 'outer',
                        innerHTML: element.outerHTML,
                        styles: 'border:1px solid grey;width:700px;height:600px;padding:2px'
                    });
                    document.body.appendChild(outerEle);
                    element = document.getElementById('drag');
                    mousedown.target = mousedown.currentTarget = element;
                    instance = new draggable_1.Draggable(element, { clone: false, dragArea: '#outer' });
                    event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                    mousemove.srcElement = mousemove.targetElement = mousemove.toElement = element;
                });
                it('Drag Area is initiated properly using selector', function () {
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.dragLimit).toEqual({ left: 11, right: 711, top: 11, bottom: 611 });
                    instance.intDestroy(mousedown);
                });
                it('Drag Area is initiated properly using element options', function () {
                    instance.dragArea = outerEle;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.dragLimit).toEqual({ left: 11, right: 711, top: 11, bottom: 611 });
                    instance.intDestroy(mousedown);
                });
                it('Drag Area is not initiated when property is not specifed', function () {
                    instance.dragArea = undefined;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.dragLimit).toEqual({ left: 0, right: 0, top: 0, bottom: 0 });
                    instance.intDestroy(mousedown);
                });
                it('Drag Area with min width and height', function () {
                    outerEle.style.width = '0px';
                    outerEle.style.height = '0px';
                    outerEle.style.border = 'none';
                    outerEle.style.padding = '0px';
                    instance.dragArea = outerEle;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.dragLimit).toEqual({ left: 8, right: 8, top: 8, bottom: 8 });
                    instance.intDestroy(mousedown);
                });
            });
            describe('Drag with draggable area', function () {
                var instance;
                var dragEvent;
                var outerEle;
                beforeEach(function () {
                    element = dom_1.createElement('div', {
                        id: 'drag', innerHTML: '<P>Draggable Text</P>',
                        styles: 'border:1px solid black;width:300px;height:150px'
                    });
                    outerEle = dom_1.createElement('div', {
                        id: 'outer',
                        innerHTML: element.outerHTML,
                        styles: 'border:1px solid grey;width:700px;height:600px;padding:2px'
                    });
                    document.body.appendChild(outerEle);
                    element = document.getElementById('drag');
                    mousedown.target = mousedown.currentTarget = element;
                    dragEvent = jasmine.createSpy('drag');
                    instance = new draggable_1.Draggable(element, { clone: false, drag: dragEvent, dragArea: '#outer' });
                    event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                    mousemove.srcElement = mousemove.target = mousemove.toElement = element;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    mousemove = setMouseCordinates(mousemove, 19, 20);
                });
                it('drag event is triggered properly', function () {
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragEvent).toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('drag event is prevented from triggered', function () {
                    instance.drag = null;
                    instance.dragArea = null;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(dragEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('drag operation with drag area exceeding right value and minimum top value', function () {
                    mousemove = setMouseCordinates(mousemove, 1500, 12);
                    mousemove.srcElement = mousemove.target = mousemove.toElement = document.body;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.element.style.top).toBe('10px');
                    expect(instance.element.style.left).toBe('408px');
                    instance.intDestroy(mousedown);
                });
                it('drag operation with drag area exceeding top value and minimum left value', function () {
                    mousemove = setMouseCordinates(mousemove, 8, 700);
                    mousemove.srcElement = mousemove.target = mousemove.toElement = document.body;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.element.style.top).toBe('458px');
                    expect(instance.element.style.left).toBe('10px');
                    instance.intDestroy(mousedown);
                });
                it('drag operation within the draggable area', function () {
                    mousemove = setMouseCordinates(mousemove, 25, 35);
                    mousemove.srcElement = mousemove.targetElement = mousemove.toElement = document.body;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.element.style.top).toBe('32px');
                    expect(instance.element.style.left).toBe('18px');
                    instance.intDestroy(mousedown);
                });
                it('drag operation with previous value', function () {
                    mousemove = setMouseCordinates(mousemove, 25, 35);
                    mousemove.srcElement = mousemove.targetElement = mousemove.toElement = document.body;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.element.style.top).toBe('32px');
                    expect(instance.element.style.left).toBe('18px');
                    instance.intDestroy(mousedown);
                });
                it('drag operation with invalid  values', function () {
                    mousemove = setMouseCordinates(mousemove, 0, 0);
                    mousemove.srcElement = mousemove.targetElement = mousemove.toElement = document.body;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    expect(instance.element.style.top).toBe('10px');
                    expect(instance.element.style.left).toBe('10px');
                    instance.intDestroy(mousedown);
                });
                it('drag event with multi touch point is prevented properly', function () {
                    var dMouseMove = util_1.extend({}, mousemove);
                    dMouseMove.changedTouches = [{}, {}];
                    event_handler_1.EventHandler.trigger((document), 'mousemove', dMouseMove);
                    expect(dragEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
            });
            describe('Drag without draggable area and negative values', function () {
                var instance;
                beforeEach(function () {
                    element = getElement();
                    mousedown.target = mousedown.currentTarget = element;
                    instance = new draggable_1.Draggable(element, { clone: false });
                    event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                    mousemove.srcElement = mousemove.target = mousemove.toElement = element;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    mousemove = setMouseCordinates(mousemove, 0, 0);
                });
                it('drag event is triggered properly', function () {
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    var style = instance.element.style;
                    expect(style.top).toBe('-5px');
                    expect(style.left).toBe('-9px');
                    instance.intDestroy(mousedown);
                });
                afterEach(function () {
                    element.remove();
                    document.body.innerHTML = '';
                });
            });
            describe('Drag Stop', function () {
                var instance;
                var dragEndEvent;
                var outerEle;
                var mouseUp;
                beforeEach(function () {
                    element = getElement();
                    mousedown.target = mousedown.currentTarget = element;
                    dragEndEvent = jasmine.createSpy('dragEnd');
                    instance = new draggable_1.Draggable(element, { clone: false, dragStop: dragEndEvent, });
                    event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                    mousemove.srcElement = mousemove.target = mousemove.toElement = element;
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    mousemove = setMouseCordinates(mousemove, 50, 50);
                    event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                    mouseUp = getEventObject('MouseEvents', 'mouseup');
                    mouseUp.srcElement = mouseUp.target = mouseUp.toElement = element;
                });
                it('Drag stop event triggered properly', function () {
                    event_handler_1.EventHandler.trigger((document), 'mouseup', mouseUp);
                    expect(dragEndEvent).toHaveBeenCalled();
                });
                it('Check the aria-grabbed value on the drag-stop action', function () {
                    event_handler_1.EventHandler.trigger((document), 'mouseup', mouseUp);
                    expect(instance.element.getAttribute('aria-grabbed')).toBe('false');
                });
                it('Drag stop not triggered while model value is not set', function () {
                    instance.dragStop = undefined;
                    event_handler_1.EventHandler.trigger((document), 'mouseup', mouseUp);
                    expect(dragEndEvent).not.toHaveBeenCalled();
                });
                it('Drag stop prevented on invalid event type', function () {
                    mouseUp.type = 'mousemove';
                    event_handler_1.EventHandler.trigger((document), 'mouseup', mouseUp);
                    expect(dragEndEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
                it('Drag stop using touch event', function () {
                    mouseUp.type = 'touchend';
                    mouseUp.changedTouches = [setMouseCordinates({ target: element }, mouseUp.pageX, mouseUp.pageY)];
                    event_handler_1.EventHandler.trigger((document), 'mouseup', mouseUp);
                    expect(dragEndEvent).toHaveBeenCalled();
                });
                it('Drag stop using touch event with multiple touch points', function () {
                    var dMouseUp = util_1.extend({}, mouseUp);
                    dMouseUp.changedTouches = [{}, {}];
                    event_handler_1.EventHandler.trigger((document), 'mouseup', dMouseUp);
                    expect(dragEndEvent).not.toHaveBeenCalled();
                    instance.intDestroy(mousedown);
                });
            });
            afterEach(function () {
                element.remove();
                document.body.innerHTML = '';
            });
        });
        describe('drag is prevented while element is removed from dragstart event', function () {
            var inst;
            var cloneDrag;
            var dMousedown;
            var dMousemove;
            var dEle = getElement();
            beforeAll(function () {
                cloneDrag = jasmine.createSpy('drag');
                dMousedown = getEventObject('MouseEvents', 'mousedown');
                dMousedown = setMouseCordinates(dMousedown, 17, 200);
                dMousemove = getEventObject('MouseEvents', 'mousemove');
                dMousemove = setMouseCordinates(dMousemove, 18, 200);
                var elem = dom_1.createElement('div', {
                    id: 'clonevis',
                    innerHTML: 'Test Drag Element',
                    styles: 'border: 1px red solid; width: 200px; height: 100px'
                });
                dMousedown.target = dMousedown.currentTarget = elem;
                inst = new draggable_1.Draggable(dEle, {
                    helper: function () {
                        document.body.appendChild(elem);
                        return elem;
                    },
                    dragStart: function () {
                        document.getElementById('clonevis').remove();
                    }, drag: cloneDrag
                });
                event_handler_1.EventHandler.trigger(dEle, 'mousedown', dMousedown);
                dMousemove.srcElement = dMousemove.target = dMousemove.toElement = dEle;
            });
            it('prevent drag action while dragabble element is removed', function () {
                event_handler_1.EventHandler.trigger((document), 'mousemove', dMousemove);
                dMousemove = setMouseCordinates(dMousemove, 20, 200);
                event_handler_1.EventHandler.trigger((document), 'mousemove', dMousemove);
                expect(cloneDrag).not.toHaveBeenCalled();
                inst.intDestroy(dMousedown);
            });
        });
    });
    describe('droppable', function () {
        var dropInstance;
        var dropElem;
        var mousup;
        dropElem = getElement('drop');
        var drop = jasmine.createSpy('drop');
        beforeEach(function () {
            dropInstance = new droppable_1.Droppable(dropElem, { drop: drop });
            mousup = getEventObject('MouseEvents', 'mouseup');
            mousup.target = mousup.currentTarget = dropElem;
            event_handler_1.EventHandler.trigger(dropElem, 'mouseup', mousup);
        });
        it('initialize droppable', function () {
            expect(dropElem.classList.contains('e-control')).toBe(true);
            expect(dropElem.classList.contains('e-droppable')).toBe(true);
        });
        it('check element instance', function () {
            expect(dropElem.ej2_instances[0].constructor.name).toBe('Droppable');
        });
        it('check drop event', function () {
            expect(drop).not.toHaveBeenCalled();
            dropInstance.drop = null;
            dropInstance.onPropertyChanged({}, {});
        });
        afterEach(function () {
            dropElem.remove();
            document.body.innerHTML = '';
        });
    });
    describe('Drag and Drop', function () {
        var dropInstance;
        var dropElem;
        var dragElem;
        var dragInstance;
        var dragOut;
        var dragOver;
        var dropevt;
        var mousedown = getEventObject('MouseEvents', 'mousedown');
        mousedown = setMouseCordinates(mousedown, 14, 296);
        var mousemove = getEventObject('MouseEvents', 'mousemove');
        describe('intDrag and intDrop and ', function () {
            beforeEach(function () {
                dropElem = getElement('drop', 'border:1px solid grey;width:500px;height:350px;padding:10px;margin:10px', ' ');
                dragElem = getElement();
                dragOut = jasmine.createSpy('out');
                dragOver = jasmine.createSpy('over');
                dropevt = jasmine.createSpy('drop');
                dropInstance = new droppable_1.Droppable(dropElem, { out: dragOut, over: dragOver, drop: dropevt });
                dragInstance = new draggable_1.Draggable(dragElem, { clone: false });
                mousedown.target = mousedown.currentTarget = dragElem;
                event_handler_1.EventHandler.trigger(dragElem, 'mousedown', mousedown);
                mousemove = setMouseCordinates(mousemove, 15, 402);
                mousemove.srcElement = mousemove.targetElement = mousemove.toElement = dragElem;
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
            });
            it('Check Mouse over droppable element', function () {
                mousemove = setMouseCordinates(mousemove, 34, 380);
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                expect(dragOver).toHaveBeenCalled();
                dragInstance.intDestroy();
            });
            it('Check Mouse over droppable element and mouse with mouseover set as true', function () {
                mousemove = setMouseCordinates(mousemove, 34, 380);
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                dropInstance.mouseOver = true;
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                expect(dragOver).not.toHaveBeenCalled();
                dragInstance.intDestroy();
            });
            it('Check Mouse out droppable element', function () {
                mousemove = setMouseCordinates(mousemove, 34, 380);
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                mousemove = setMouseCordinates(mousemove, 100, 386);
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                expect(dragOut).toHaveBeenCalled();
                dragInstance.intDestroy();
            });
            it('Check Mouse out droppable element with mouseover set to false', function () {
                mousemove = setMouseCordinates(mousemove, 34, 380);
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                mousemove = setMouseCordinates(mousemove, 100, 386);
                dropInstance.mouseOver = false;
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                expect(dragOut).not.toHaveBeenCalled();
                dragInstance.intDestroy();
            });
            it('Check Drop event is called ', function () {
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                mousemove = setMouseCordinates(mousemove, 129, 116);
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                var mouseup = getEventObject('MouseEvents', 'mouseup');
                mouseup.target = mouseup.srcElement = mouseup.toElement = tempElem;
                mouseup.currentTarget = document;
                mouseup = setMouseCordinates(mouseup, 129, 116);
                event_handler_1.EventHandler.trigger((document), 'mouseup', mouseup);
                expect(dropevt).toHaveBeenCalled();
            });
            it('Check Drop event without calling the drag event ', function () {
                var tempElem = document.getElementById('drag1');
                var mouseup = getEventObject('MouseEvents', 'mouseup');
                mouseup.target = mouseup.srcElement = mouseup.toElement = tempElem;
                mouseup.currentTarget = document;
                mouseup = setMouseCordinates(mouseup, 129, 116);
                event_handler_1.EventHandler.trigger((document), 'mouseup', mouseup);
                expect(dropevt).toHaveBeenCalled();
            });
            it('Check Drop event with accept argument  is called ', function () {
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                mousemove = setMouseCordinates(mousemove, 129, 116);
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                var mouseup = getEventObject('MouseEvents', 'mouseup');
                mouseup.target = mouseup.srcElement = mouseup.toElement = tempElem;
                mouseup.currentTarget = document;
                mouseup = setMouseCordinates(mouseup, 129, 116);
                dropInstance.accept = '.common';
                event_handler_1.EventHandler.trigger((document), 'mouseup', mouseup);
                expect(dropevt).toHaveBeenCalled();
            });
            it('Check Drop event with invalid accept selector   is not called ', function () {
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                mousemove = setMouseCordinates(mousemove, 129, 116);
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                var mouseup = getEventObject('MouseEvents', 'mouseup');
                mouseup.target = mouseup.srcElement = mouseup.toElement = tempElem;
                mouseup.currentTarget = document;
                mouseup = setMouseCordinates(mouseup, 129, 116);
                dropInstance.accept = '.drag1';
                event_handler_1.EventHandler.trigger((document), 'mouseup', mouseup);
                expect(dropevt).not.toHaveBeenCalled();
            });
            it('Check Drop event using touch event', function () {
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                mousemove = setMouseCordinates(mousemove, 129, 116);
                dropInstance.out = function () { return null; };
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                var mouseup = getEventObject('MouseEvents', 'mouseup');
                mouseup.target = mouseup.srcElement = mouseup.toElement = tempElem;
                mouseup.currentTarget = document;
                mouseup = setMouseCordinates(mouseup, 129, 116);
                mouseup.type = 'touchend';
                mouseup.changedTouches = [setMouseCordinates({ target: tempElem }, mouseup.pageX, mouseup.pageY)];
                event_handler_1.EventHandler.trigger((document), 'mouseup', mouseup);
                expect(dropevt).toHaveBeenCalled();
            });
            it('check child element inside droppable pop  up to parnet properly', function () {
                var touchEle = getElement('touch', 'border:1px solid cyan;height:200px;width:300px;margin:10px');
                dropElem.appendChild(touchEle);
                var touchInst = new touch_1.Touch(touchEle);
                var tempElem = document.getElementById('drag1');
                mousemove.target = mousemove.srcElement = mousemove.toElement = tempElem;
                mousemove.currentTarget = document;
                mousemove = setMouseCordinates(mousemove, 254, 229);
                event_handler_1.EventHandler.trigger((document), 'mousemove', mousemove);
                expect(dragOver).toHaveBeenCalled();
                dragInstance.intDestroy();
            });
            describe('check destroy method', function () {
                it('Destroy for Draggable', function () {
                    var instance = new draggable_1.Draggable(element, { handle: 'p' });
                    instance.destroy();
                    mousedown.target = mousedown.currentTarget = document.getElementsByTagName('p')[0];
                    event_handler_1.EventHandler.trigger(element, 'mousedown', mousedown);
                    expect(instance.initialPosition).toBeUndefined();
                    expect(element.classList.contains('e-draggable')).toBe(false);
                });
                it('Destroy for Droppable', function () {
                    var instance = new droppable_1.Droppable(element);
                    instance.destroy();
                    expect(element.classList.contains('e-droppable')).toBe(false);
                });
            });
            afterEach(function () {
                document.body.innerHTML = '';
            });
        });
    });
});
