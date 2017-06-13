import { Base } from './base';
import { Browser } from './browser';
import { isVisible } from './dom';
import { Property, Complex, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';
import { EventHandler } from './event-handler';
import { ChildProperty } from './child-property';
import { PositionModel, DraggableModel } from './draggable-model';
import { select, closest, setStyleAttribute, addClass, createElement } from './dom';
import { extend, isUndefined, isNullOrUndefined, compareElementParent } from './util';
const defaultPosition: PositionModel = { left: 0, right: 0, top: 0, bottom: 0 };
const positionProp: string[] = ['offsetLeft', 'offsetTop'];
export class Position extends ChildProperty<Position> {
    /**
     * Property specifies the left position of cursor in draggable.
     */
    @Property(0)
    public left: number;
    /**
     * Property specifies the right position of cursor in draggable.
     */
    @Property(0)
    public right: number;
    /**
     * Property specifies the left position of cursor in draggable.
     */
    @Property(0)
    public top: number;
    /**
     * Property specifies the left position of cursor in draggable.
     */
    @Property(0)
    public bottom: number;
}
interface PageInfo {
    x: number;
    y: number;
}
/**
 * Coordinates for element position
 * @private
 */
export interface Coordinates {
    /**
     * Defines the x Coordinate of page.
     */
    pageX: number;
    /**
     * Defines the y Coordinate of page. 
     */
    pageY: number;
    /**
     * Defines the x Coordinate of client.
     */
    clientX: number;
    /**
     * Defines the y Coordinate of client. 
     */
    clientY: number;
}
/**
 * Drop Info stored in the droppable object
 * @private
 */
export interface DropInfo {
    /**
     * Specifies the current draggable element
     */
    draggable?: HTMLElement;
    /**
     * Specifies the current helper element. 
     */
    helper?: HTMLElement;
}
export interface DropObject {
    target: HTMLElement;
    instance: DropOption;
}
/**
 * Used for accessing the interface.
 * @private
 */
export interface Instance extends HTMLElement {
    /**
     * specifies current instance collection in element
     */
    ej2_instances: { [key: string]: Object }[];
}
/**
 * Droppable function to be invoked from draggable
 * @private
 */
export interface DropOption {
    /**
     * Used to triggers  over function while  draggable  element is over the droppable element.
     */
    intOver: Function;
    /**
     * Used to triggers  out function while  draggable  element is out of the droppable element.
     */
    intOut: Function;
    /**
     * Used to triggers  out function while  draggable  element is dropped on the  the droppable element.
     */
    intDrop: Function;
    /**
     * Specifies the information about the drag element.
     */
    dragData: DropInfo;
    /**
     * Specifies the status of the drag of drag stop calling.
     */
    dragStopCalled: boolean;
}
/**
 * Drag Event args
 * @private
 */
export interface DragEventArgs {
    /**
     * Specifies the actual event.
     */
    event?: MouseEvent & TouchEvent;
    /**
     * Specifies the current drag element.
     */
    element?: HTMLElement;
    /**
     * Specifies the current target element.
     */
    target?: HTMLElement;
}
/**
 * Draggable Module provides support to enable draggable functionality in Dom Elements.
 * ```html
 * <div id='drag'>Draggable</div>
 * <script>
 * var ele = document.getElementById('drag');
 * var drag:Draggable = new Draggable(ele,{
 *     clone:false,
 *     drag: function(e) {
 *      //drag handler code.
 *      },
 *     handle:'.class'
 * });
 * </script>
 * ```
 * @private
 */
@NotifyPropertyChanges
export class Draggable extends Base<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Change the cursor position of draggable
     */
    @Complex<PositionModel>({}, Position)
    public cursorAt: PositionModel;
    /**
     * Specifies whether to clone the draggable element or not.
     * @default true
     */
    @Property(true)
    public clone: boolean;
    /**
     * Specifies the area in which dragging to happen.
     */
    @Property()
    public dragArea: HTMLElement | string;
    /**
     * Specifies the callback function for drag event.
     * @event
     */
    @Event()
    public drag: Function;
    /**
     * Specifies the callback function for dragStart event.
     * @event
     */
    @Event()
    public dragStart: Function;
    /**
     * Specifies the callback function for dragStop event.
     * @event
     */
    @Event()
    public dragStop: Function;
    /**
     * Specifies the minimum distance draggable element moved to perform dragging operation.
     * @default 1
     */
    @Property(1)
    public distance: number;
    /**
     * Specifies the selector for the child element by which parent  element can be dragged.
     */
    @Property()
    public handle: string;
    /**
     * Specifies the selector for the child element to prevent the dragging of the parent element by selecting  the child.
     */
    @Property()
    public abort: string;
    /**
     * Defines the function for customizing the draggable element on cloning.
     */
    @Property()
    public helper: Function;
    /**
     * Defines the current score for grouping draggable and droppable.
     */
    @Property('default')
    public scope: string;
    /**
     * Specifies the dragTarget by which the clone element is positioned if not given current context element will be considered.
     */
    @Property('')
    public dragTarget: string;

    private target: HTMLElement;
    private initialPosition: PageInfo;
    private relativeXPosition: number;
    private relativeYPosition: number;
    private margin: PositionModel;
    private offset: PositionModel;
    private position: PositionModel;
    private dragLimit: PositionModel = Draggable.getDefaultPosition();
    private borderWidth: PositionModel = Draggable.getDefaultPosition();
    private padding: PositionModel = Draggable.getDefaultPosition();
    private pageX: number;
    private diffX: number = 0;
    private diffY: number = 0;
    private pageY: number;
    private helperElement: HTMLElement;
    private hoverObject: DropObject;
    private parentClientRect: PositionModel;
    public droppables: { [key: string]: DropInfo } = {};
    constructor(element: HTMLElement, options?: DraggableModel) {
        super(options, element);
        this.bind();
    }
    protected bind(): void {
        this.toggleEvents();
        if (Browser.isIE) {
            addClass([this.element], 'e-block-touch');
        }
        this.droppables[this.scope] = {};
    }
    private static getDefaultPosition(): PositionModel {
        return extend({}, defaultPosition);
    }
    private toggleEvents(isUnWire?: boolean): void {
        let ele: Element;
        if (!isUndefined(this.handle)) {
            ele = select(this.handle);
        }
        if (isUnWire) {
            EventHandler.remove(ele || this.element, Browser.touchStartEvent, this.initialize);
        } else {
            EventHandler.add(ele || this.element, Browser.touchStartEvent, this.initialize, this);
        }
    }
    private initialize(evt: MouseEvent & TouchEvent): void {
        this.target = <HTMLElement>evt.currentTarget;
        if (!isUndefined(evt.changedTouches)) {
            evt.preventDefault();
        }
        if (this.abort) {
            if (!isNullOrUndefined(closest((evt.target as Element), this.abort))) {
                return;
            }
        }
        this.element.setAttribute('aria-grabbed', 'true');
        let intCoord: Coordinates = this.getCoordinates(evt);
        this.initialPosition = { x: intCoord.pageX, y: intCoord.pageY };
        if (!this.clone) {
            let pos: PositionModel = this.element.getBoundingClientRect();
            this.relativeXPosition = intCoord.pageX - pos.left;
            this.relativeYPosition = intCoord.pageY - pos.top;
        }
        EventHandler.add(document, Browser.touchMoveEvent, this.intDragStart, this);
        EventHandler.add(document, Browser.touchEndEvent, this.intDestroy, this);
        this.toggleEvents(true);
        document.body.classList.add('e-prevent-select');
        EventHandler.trigger(document.documentElement, Browser.touchStartEvent, evt);
    }
    private intDragStart(evt: MouseEvent & TouchEvent): void {
        if (!isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        let intCordinate: Coordinates = this.getCoordinates(evt);
        let pos: PositionModel;
        let styleProp: CSSStyleDeclaration = getComputedStyle(this.element);
        this.margin = {
            left: parseInt(styleProp.marginLeft, 10),
            top: parseInt(styleProp.marginTop, 10),
            right: parseInt(styleProp.marginRight, 10),
            bottom: parseInt(styleProp.marginBottom, 10),
        };
        let element: HTMLElement = this.element;
        if (this.clone && this.dragTarget) {
            let intClosest: HTMLElement = <HTMLElement>closest(evt.target as Element, this.dragTarget);
            if (!isNullOrUndefined(intClosest)) {
                element = intClosest;
            }
        }
        this.offset = this.calculateParentPosition(element);
        this.position = this.getMousePosition(evt);
        let x: number = this.initialPosition.x - intCordinate.pageX;
        let y: number = this.initialPosition.y - intCordinate.pageY;
        let distance: number = Math.sqrt((x * x) + (y * y));
        if (distance >= this.distance) {
            let ele: HTMLElement = this.getHelperElement(evt);
            if (!ele || isNullOrUndefined(ele)) {
                return;
            }
            let dragTargetElement: HTMLElement = this.helperElement = ele;
            this.parentClientRect = this.calculateParentPosition(dragTargetElement.offsetParent);
            if (this.dragStart) {
                let curTarget: Element = this.getProperTargetElement(evt);
                this.trigger('dragStart', { event: evt, element: element, target: curTarget });
            }
            if (this.dragArea) {
                this.setDragArea();
            } else {
                this.dragLimit = { left: 0, right: 0, bottom: 0, top: 0 };
                this.borderWidth = { top: 0, left: 0 };
            }
            pos = { left: this.position.left - this.parentClientRect.left, top: this.position.top - this.parentClientRect.top };
            if (this.clone) {
                this.diffX = this.position.left - this.offset.left;
                this.diffY = this.position.top - this.offset.top;
            }
            setStyleAttribute(dragTargetElement, {
                position: 'absolute', top: (pos.top - this.diffY) + 'px', left: (pos.left - this.diffX) + 'px'
            });
            EventHandler.remove(document, Browser.touchMoveEvent, this.intDragStart);
            EventHandler.remove(document, Browser.touchEndEvent, this.intDestroy);
            if (isVisible(dragTargetElement)) {
                EventHandler.add(document, Browser.touchMoveEvent, this.intDrag, this);
                EventHandler.add(document, Browser.touchEndEvent, this.intDragStop, this);
                this.setGlobalDroppables(false, this.element, dragTargetElement);
            } else {
                document.body.classList.remove('e-prevent-select');
            }
        }
    }
    private calculateParentPosition(ele: Element): PositionModel {
        if (isNullOrUndefined(ele)) {
            return { left: 0, top: 0 };
        }
        let rect: ClientRect = ele.getBoundingClientRect();
        let style: CSSStyleDeclaration = getComputedStyle(ele);
        return {
            left: (rect.left + window.pageXOffset) - parseInt(style.marginLeft, 10),
            top: (rect.top + window.pageYOffset) - parseInt(style.marginTop, 10)
        };
    }
    private intDrag(evt: MouseEvent & TouchEvent): void {
        if (!isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        let left: number;
        let top: number;
        this.position = this.getMousePosition(evt);
        let docHeight: number = this.getDocumentWidthHeight('Height');
        if (docHeight < this.position.top) {
            this.position.top = docHeight;
        }
        let docWidth: number = this.getDocumentWidthHeight('Width');
        if (docWidth < this.position.left) {
            this.position.left = docWidth;
        }
        if (this.drag) {
            let curTarget: HTMLElement = this.getProperTargetElement(evt);
            this.trigger('drag', { event: evt, element: this.element, target: curTarget });
        }
        let eleObj: DropObject = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.intOver(evt, eleObj.target);
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            this.hoverObject = eleObj;
        } else if (this.hoverObject) {
            this.hoverObject.instance.intOut(evt, eleObj.target);
            this.hoverObject.instance.dragData[this.scope] = null;
            this.hoverObject = null;
        }
        let helperElement: HTMLElement = this.droppables[this.scope].helper;
        this.parentClientRect = this.calculateParentPosition(this.helperElement.offsetParent);
        let tLeft: number = this.parentClientRect.left;
        let tTop: number = this.parentClientRect.top;
        let intCoord: Coordinates = this.getCoordinates(evt);
        let pagex: number = intCoord.pageX;
        let pagey: number = intCoord.pageY;
        let dLeft: number = this.position.left - this.diffX;
        let dTop: number = this.position.top - this.diffY;
        if (this.dragArea) {
            let styles: CSSStyleDeclaration = getComputedStyle(helperElement);
            if (this.pageX !== pagex) {
                let helperWidth: number = helperElement.offsetWidth + (parseFloat(styles.marginLeft)
                    + parseFloat(styles.marginRight));
                if (this.dragLimit.left > dLeft) {
                    left = this.dragLimit.left;
                } else if (this.dragLimit.right < dLeft + helperWidth) {
                    left = this.dragLimit.right - helperWidth;
                } else {
                    left = dLeft;
                }
            }
            if (this.pageY !== pagey) {
                let helperHeight: number = helperElement.offsetHeight + (parseFloat(styles.marginTop)
                    + parseFloat(styles.marginBottom));
                if (this.dragLimit.top > dTop) {
                    top = this.dragLimit.top;
                } else if (this.dragLimit.bottom < dTop + helperHeight) {
                    top = this.dragLimit.bottom - helperHeight;
                } else {
                    top = dTop;
                }
            }
        } else {
            left = dLeft;
            top = dTop;
        }
        let iTop: number = tTop + this.borderWidth.top;
        let iLeft: number = tLeft + this.borderWidth.left;
        setStyleAttribute(helperElement, { top: (top - iTop) + 'px', left: (left - iLeft) + 'px' });
        this.position.left = left;
        this.position.top = top;
        this.pageX = pagex;
        this.pageY = pagey;
    }
    private getDocumentWidthHeight(str: string): number {
        let docBody: Element = document.body;
        let docEle: Element = document.documentElement;
        let returnValue: number = Math.max(
            docBody['scroll' + str], docEle['scroll' + str],
            docBody['offset' + str], docEle['offset' + str], docEle['client' + str]);
        return returnValue;
    }
    private intDragStop(evt: MouseEvent & TouchEvent): void {
        if (!isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        let type: string[] = ['touchend', 'pointerup', 'mouseup'];
        if (type.indexOf(evt.type) !== -1) {
            if (this.dragStop) {
                let curTarget: Element = this.getProperTargetElement(evt);
                this.trigger('dragStop', { event: evt, element: this.element, target: curTarget, helper: this.helperElement });
            }
            this.intDestroy(evt);
        } else {
            this.element.setAttribute('aria-grabbed', 'false');
        }
        let eleObj: DropObject = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.dragStopCalled = true;
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            eleObj.instance.intDrop(evt, eleObj.target);
        }
        this.setGlobalDroppables(true);
        document.body.classList.remove('e-prevent-select');
    }

    private intDestroy(evt: MouseEvent & TouchEvent): void {
        this.toggleEvents();
        document.body.classList.remove('e-prevent-select');
        this.element.setAttribute('aria-grabbed', 'false');
        EventHandler.remove(document, Browser.touchMoveEvent, this.intDragStart);
        EventHandler.remove(document, Browser.touchEndEvent, this.intDragStop);
        EventHandler.remove(document, Browser.touchEndEvent, this.intDestroy);
        EventHandler.remove(document, Browser.touchMoveEvent, this.intDrag);
    }
    // triggers when property changed
    public onPropertyChanged(newProp: DraggableModel, oldProp: DraggableModel): void {
        //No Code to handle
    }
    public getModuleName(): string {
        return 'draggable';
    }
    private setDragArea(): void {
        let eleWidthBound: number;
        let eleHeightBound: number;
        let top: number = 0;
        let left: number = 0;
        let ele: HTMLElement;
        let type: string = typeof this.dragArea;
        if (type === 'string') {
            ele = <HTMLElement>select(<string>this.dragArea);
        } else {
            ele = <HTMLElement>this.dragArea;
        }
        if (ele) {
            let elementArea: ClientRect = ele.getBoundingClientRect();
            eleWidthBound = elementArea.width ? elementArea.width : elementArea.right - elementArea.left;
            eleHeightBound = elementArea.height ? elementArea.height : elementArea.bottom - elementArea.top;
            let keys: string[] = ['Top', 'Left', 'Bottom', 'Right'];
            let styles: CSSStyleDeclaration = getComputedStyle(ele);
            for (let i: number = 0; i < keys.length; i++) {
                let key: string = keys[i];
                let tborder: string = styles['border' + key + 'Width'];
                let tpadding: string = styles['padding' + key];
                let lowerKey: string = key.toLowerCase();
                this.borderWidth[lowerKey] = isNaN(parseFloat(tborder)) ? 0 : parseFloat(tborder);
                this.padding[lowerKey] = isNaN(parseFloat(tpadding)) ? 0 : parseFloat(tpadding);
            }
            top = elementArea.top;
            left = elementArea.left;
            this.dragLimit.left = left + this.borderWidth.left + this.padding.left;
            this.dragLimit.top = top + this.borderWidth.top + this.padding.top;
            this.dragLimit.right = left + eleWidthBound - (this.borderWidth.right + this.padding.right);
            this.dragLimit.bottom = top + eleHeightBound - (this.borderWidth.bottom + this.padding.bottom);
        }
    }
    private getProperTargetElement(evt: MouseEvent & TouchEvent): HTMLElement {
        let intCoord: Coordinates = this.getCoordinates(evt);
        let ele: HTMLElement;
        if (evt.target === this.helperElement || evt.type.indexOf('touch') !== -1) {
            this.helperElement.style.display = 'none';
            ele = <HTMLElement>document.elementFromPoint(intCoord.clientX, intCoord.clientY);
            this.helperElement.style.display = '';
        } else {
            ele = <HTMLElement>evt.target;
        }
        return ele;
    }
    private getMousePosition(evt: MouseEvent & TouchEvent): PositionModel {
        let intCoord: Coordinates = this.getCoordinates(evt);
        let pageX: number = this.clone ? intCoord.pageX : intCoord.pageX - this.relativeXPosition;
        let pageY: number = this.clone ? intCoord.pageY : intCoord.pageY - this.relativeYPosition;
        return {
            left: pageX - (this.margin.left + this.cursorAt.left),
            top: pageY - (this.margin.top + this.cursorAt.top)
        };
    }
    private getCoordinates(evt: MouseEvent & TouchEvent): Coordinates {
        if (evt.type.indexOf('touch') > -1) {
            return evt.changedTouches[0];
        }
        return evt;
    }
    private getHelperElement(evt: MouseEvent & TouchEvent): HTMLElement {
        let element: HTMLElement;
        if (this.clone) {
            if (this.helper) {
                element = this.helper({ sender: evt, element: this.target });
            } else {
                element = createElement('div', { className: 'e-drag-helper e-block-touch', innerHTML: 'Draggable' });
                document.body.appendChild(element);
            }
        } else {
            element = this.element;
        }
        return element;
    }
    private setGlobalDroppables(reset: boolean, drag?: HTMLElement, helper?: HTMLElement): void {
        this.droppables[this.scope] = reset ? null : {
            draggable: drag,
            helper: helper
        };
    }
    private checkTargetElement(evt: MouseEvent & TouchEvent): DropObject {
        let target: Element = this.getProperTargetElement(evt);
        if (this.helperElement && compareElementParent(target, this.helperElement)) {
            this.helperElement.style.display = 'none';
            let cord: Coordinates = this.getCoordinates(evt);
            target = document.elementFromPoint(cord.clientX, cord.clientY);
            this.helperElement.style.display = '';
        }
        let dropIns: DropOption = this.getDropInstance(target);
        if (!dropIns && target && !isNullOrUndefined(target.parentNode)) {
            let parent: Element = closest(target.parentNode, '.e-droppable') || target.parentElement;
            if (parent) {
                dropIns = this.getDropInstance(parent);
            }
        }
        return { target: (<HTMLElement>target), instance: dropIns };
    }
    private getDropInstance(ele: Element): DropOption {
        let name: string = 'getModuleName';
        let drop: Object;
        let eleInst: { [key: string]: Object }[] = ele && (<Instance>ele).ej2_instances;
        if (eleInst) {
            for (let inst of eleInst) {
                if ((<Function>inst[name])() === 'droppable') {
                    drop = inst;
                    break;
                }
            }
        }
        return <DropOption>drop;
    }
    public destroy(): void {
        this.toggleEvents(true);
        super.destroy();
    }
}