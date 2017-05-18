import { extend, isNullOrUndefined } from './util';
import { Property, Complex, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';
import { Browser } from './browser';
import { Base, EmitType } from './base';
import { ChildProperty } from './child-property';
import { EventHandler, BaseEventArgs } from './event-handler';
import { TouchModel, SwipeSettingsModel } from './touch-model';

/**
 * SwipeSettings is a framework module that provides support to handle swipe event like swipe up, swipe right, etc..,
 * @private
 */
export class SwipeSettings extends ChildProperty<SwipeSettings> {
    /**
     * Property specifies minimum distance of swipe moved.
     */
    @Property(50)
    public swipeThresholdDistance: number;
}

const swipeRegex: RegExp = /(Up|Down)/;

/**
 * Touch class provides support to handle the touch event like tap, double tap, tap hold, etc..,  
 * ```typescript
 *    let node: HTMLElement;
 * let touchObj: Touch = new Touch({
 *    element: node,
 *    tap: function (e) {
 *        // tap handler function code
 *    }
 *    doubleTap: function (e) {
 *        // double tap handler function code
 *    }
 *    taphold: function (e) {
 *        // tap hold handler function code
 *    }
 *    scroll: function (e) {
 *        // scroll handler function code
 *    }
 *    swipe: function (e) {
 *        // swipe handler function code
 *    }
 * });
 * ```   
 */
@NotifyPropertyChanges
export class Touch extends Base<HTMLElement> implements INotifyPropertyChanged {

    //Internal Variables
    private isTouchMoved: boolean;
    private startPoint: Points;
    private movedPoint: Points;
    private endPoint: Points;
    private startEventData: MouseEventArgs | TouchEventArgs;
    private lastTapTime: number;
    private lastMovedPoint: Points;
    private scrollDirection: string;
    private hScrollLocked: boolean;
    private vScrollLocked: boolean;
    private defaultArgs: TapEventArgs;
    private distanceX: number;
    private distanceY: number;
    private movedDirection: string;
    private tStampStart: number;
    private timeOutTap: number;
    private timeOutTapHold: number;

    /* Properties */

    /**
     * Specifies the callback function for tap event.
     * @event
     */
    @Event()
    public tap: EmitType<TapEventArgs>;

    /**
     * Specifies the callback function for doubleTap event.
     * @event
     */
    @Event()
    public doubleTap: EmitType<TapEventArgs>;

    /**
     * Specifies the callback function for taphold event.
     * @event
     */
    @Event()
    public taphold: EmitType<TapEventArgs>;

    /**
     * Specifies the callback function for swipe event.
     * @event
     */
    @Event()
    public swipe: EmitType<SwipeEventArgs>;

    /**
     * Specifies the callback function for scroll event.
     * @event
     */
    @Event()
    public scroll: EmitType<ScrollEventArgs>;

    /**
     * Specifies the time delay for doubleTap.
     * @default 500
     */
    @Property(500)
    public doubleTapThreshold: number;

    /**
     * Specifies the time delay for tap hold.
     * @default 750
     */
    @Property(750)
    public tapholdThreshold: number;

    /**
     * Customize the swipe event configuration.
     * @default { swipeThresholdDistance: 50 }
     */
    @Complex<SwipeSettingsModel>({}, SwipeSettings)
    public swipeSettings: SwipeSettingsModel;

    /* End-Properties */
    constructor(element: HTMLElement, options?: TouchModel) {
        super(options, element);
        this.bind();
    }

    // triggers when property changed 
    /**
     * @private
     * @param newProp 
     * @param oldProp 
     */
    public onPropertyChanged(newProp: TouchModel, oldProp: TouchModel): void {
        //No Code to handle
    }

    protected bind(): void {
        this.wireEvents();
        if (Browser.isIE) { this.element.classList.add('e-block-touch'); }
    }

    /**
     * To destroy the touch instance.
     * @return {void}
     */
    public destroy(): void {
        this.unwireEvents();
        super.destroy();
    }

    // Need to changes the event binding once we updated the event handler.
    private wireEvents(): void {
        EventHandler.add(this.element, Browser.touchStartEvent, this.startEvent, this);
    }

    private unwireEvents(): void {
        EventHandler.remove(this.element, Browser.touchStartEvent, this.startEvent);
    }

    /**
     * Returns module name as touch
     * @returns {string}
     * @private
     */
    public getModuleName(): string {
        return 'touch';
    }

    /**
     * Returns if the HTML element is Scrollable.
     * @param {HTMLElement} element - HTML Element to check if Scrollable.
     * @returns {boolean}
     */
    private isScrollable(element: HTMLElement): boolean {
        let eleStyle: CSSStyleDeclaration = getComputedStyle(element);
        let style: string = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
        if ((/(auto|scroll)/).test(style)) { return true; }
        return false;
    }

    private startEvent: Function = (evt: MouseEventArgs | TouchEventArgs): void => {
        let point: MouseEventArgs | TouchEventArgs = (evt.changedTouches ? evt.changedTouches[0] : evt);
        this.isTouchMoved = false;
        this.movedDirection = '';
        this.startPoint = this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
        this.startEventData = point;
        this.hScrollLocked = this.vScrollLocked = false;
        this.tStampStart = Date.now();
        this.timeOutTapHold = setTimeout(() => { this.tapholdEvent(evt); }, this.tapholdThreshold);
        EventHandler.add(this.element, Browser.touchMoveEvent, this.moveEvent, this);
        EventHandler.add(this.element, Browser.touchEndEvent, this.endEvent, this);
    }

    private moveEvent: Function = (evt: MouseEventArgs | TouchEventArgs): void => {
        let point: MouseEventArgs | TouchEventArgs = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.movedPoint = point;
        this.isTouchMoved = !(point.clientX === this.startPoint.clientX && point.clientY === this.startPoint.clientY);
        let eScrollArgs: Object = {};
        if (this.isTouchMoved) {
            clearTimeout(this.timeOutTapHold);
            this.calcScrollPoints(evt);
            let scrollArg: ScrollEventArgs = {
                startEvents: this.startEventData,
                originalEvent: evt, startX: this.startPoint.clientX,
                startY: this.startPoint.clientY, distanceX: this.distanceX,
                distanceY: this.distanceY, scrollDirection: this.scrollDirection,
                velocity: this.getVelocity(point)
            };
            eScrollArgs = extend(eScrollArgs, {}, scrollArg);
            this.trigger('scroll', eScrollArgs);
            this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
        }
    }

    private tapholdEvent(evt: MouseEvent | TouchEventArgs): void {
        let eTapArgs: TapEventArgs;
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.moveEvent);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.endEvent);
        eTapArgs = { originalEvent: <TouchEventArgs>evt };
        this.trigger('taphold', eTapArgs);
    }

    private endEvent: Function = (evt: MouseEventArgs | TouchEventArgs): void => {
        clearTimeout(this.timeOutTapHold);
        let point: MouseEventArgs | TouchEventArgs = evt;
        if (evt.changedTouches) { point = evt.changedTouches[0]; }
        this.isTouchMoved = !(point.clientX === this.startPoint.clientX && point.clientY === this.startPoint.clientY);
        this.endPoint = point;
        let dblTapTriggred: boolean = false;
        let eDblTapArgs: Object;
        let eTapArgs: Object;
        let eSwipeArgs: Object;
        let tDistance: number = this.swipeSettings.swipeThresholdDistance;
        this.calcPoints(evt);
        let swipeArgs: SwipeEventArgs = {
            originalEvent: evt,
            startEvents: this.startEventData,
            startX: this.startPoint.clientX,
            startY: this.startPoint.clientY,
            distanceX: this.distanceX, distanceY:
            this.distanceY, swipeDirection: this.movedDirection,
            velocity: this.getVelocity(point)
        };

        if (!this.isTouchMoved) {
            eDblTapArgs = extend(eDblTapArgs, this.defaultArgs, {});
            if (!isNullOrUndefined(this.lastTapTime) && (new Date().getTime() - this.lastTapTime) < this.doubleTapThreshold) {
                clearTimeout(this.timeOutTap);
                dblTapTriggred = true;
                this.trigger('doubleTap', eDblTapArgs);
            }
            if (!dblTapTriggred) {
                eTapArgs = extend(eTapArgs, this.defaultArgs, {});
                this.timeOutTap = setTimeout(
                    () => {
                        this.trigger('tap', eTapArgs);
                    },
                    (typeof this.doubleTap !== 'function' ? 0 : this.doubleTapThreshold));
            }
        } else {
            eSwipeArgs = extend(eSwipeArgs, this.defaultArgs, swipeArgs);
            let canTrigger: boolean = false;
            let ele: HTMLElement = this.element;
            let scrollBool: boolean = this.isScrollable(ele);
            let moved: boolean = swipeRegex.test(this.movedDirection);
            if ((tDistance < this.distanceX && !moved) || (tDistance < this.distanceY && moved)) {
                if (!scrollBool) {
                    canTrigger = true;
                } else {
                    canTrigger = this.checkSwipe(ele, moved);
                }
            }
            if (canTrigger) {
                this.trigger('swipe', eSwipeArgs);
            }
        }

        this.lastTapTime = new Date().getTime();
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.moveEvent);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.endEvent);
    }

    private calcPoints(evt: MouseEventArgs | TouchEventArgs): void {
        let point: MouseEventArgs | TouchEventArgs = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.startPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.startPoint.clientY)));
        if (this.distanceX > this.distanceY) {
            this.movedDirection = (point.clientX > this.startPoint.clientX) ? 'Right' : 'Left';
        } else {
            this.movedDirection = (point.clientY < this.startPoint.clientY) ? 'Up' : 'Down';
        }
    }

    private calcScrollPoints(evt: MouseEventArgs | TouchEventArgs): void {
        let point: MouseEventArgs | TouchEventArgs = evt.changedTouches ? evt.changedTouches[0] : evt;
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY)));
        if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
            this.scrollDirection = (point.clientX > this.lastMovedPoint.clientX) ? 'Right' : 'Left';
            this.hScrollLocked = true;
        } else {
            this.scrollDirection = (point.clientY < this.lastMovedPoint.clientY) ? 'Up' : 'Down';
            this.vScrollLocked = true;
        }
    }

    private getVelocity(pnt: MouseEventArgs | TouchEventArgs): number {
        let newX: number = pnt.clientX;
        let newY: number = pnt.clientY;
        let newT: number = Date.now();
        let xDist: number = newX - this.startPoint.clientX;
        let yDist: number = newY - this.startPoint.clientX;
        let interval: number = newT - this.tStampStart;
        return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
    }

    private checkSwipe(ele: HTMLElement, flag: boolean): boolean {
        let keys: string[] = ['scroll', 'offset'];
        let temp: string[] = flag ? ['Height', 'Top'] : ['Width', 'Left'];
        if ((ele[keys[0] + temp[0]] <= ele[keys[1] + temp[0]])) {
            return true;
        }
        return (ele[keys[0] + temp[1]] === 0) ||
            (ele[keys[1] + temp[0]] + ele[keys[0] + temp[1]] >= ele[keys[0] + temp[0]]);
    }
}

interface Points {
    clientX: number;
    clientY: number;
}

/**
 * The argument type of `Tap` Event
 */
export interface TapEventArgs extends BaseEventArgs {
    /**
     * Original native event Object.
     */
    originalEvent: TouchEventArgs | MouseEventArgs;
}

/**
 * The argument type of `Scroll` Event
 */
export interface ScrollEventArgs extends BaseEventArgs {
    /**
     * Event argument for start event.
     */
    startEvents: TouchEventArgs | MouseEventArgs;
    /**
     * Original native event object for scroll.
     */
    originalEvent: TouchEventArgs | MouseEventArgs;
    /**
     * X position when scroll started.
     */
    startX: number;
    /**
     * Y position when scroll started.
     */
    startY: number;
    /**
     * The direction scroll.
     */
    scrollDirection: string;
    /**
     * The total traveled distance from X position
     */
    distanceX: number;
    /**
     * The total traveled distance from Y position
     */
    distanceY: number;
    /**
     * The velocity of scroll.
     */
    velocity: number;
}

/**
 * The argument type of `Swipe` Event
 */
export interface SwipeEventArgs extends BaseEventArgs {
    /**
     * Event argument for start event.
     */
    startEvents: TouchEventArgs | MouseEventArgs;
    /**
     * Original native event object  for swipe.
     */
    originalEvent: TouchEventArgs | MouseEventArgs;
    /**
     * X position when swipe started.
     */
    startX: number;
    /**
     * Y position when swipe started.
     */
    startY: number;
    /**
     * The direction swipe.
     */
    swipeDirection: string;
    /**
     * The total traveled distance from X position
     */
    distanceX: number;
    /**
     * The total traveled distance from Y position
     */
    distanceY: number;
    /**
     * The velocity of swipe.
     */
    velocity: number;
}

export interface TouchEventArgs extends MouseEvent {
    /**
     * A TouchList with touched points.
     */
    changedTouches: MouseEventArgs[] | TouchEventArgs[];
    /**
     * Cancel the default action.
     */
    preventDefault(): void;
    /**
     * The horizontal coordinate point of client area.
     */
    clientX: number;
    /**
     * The vertical coordinate point of client area.
     */
    clientY: number;
}

export interface MouseEventArgs extends MouseEvent {
    /**
     * A TouchList with touched points.
     */
    changedTouches: MouseEventArgs[] | TouchEventArgs[];
    /**
     * Cancel the default action.
     */
    preventDefault(): void;
    /**
     * The horizontal coordinate point of client area.
     */
    clientX: number;
    /**
     * The vertical coordinate point of client area.
     */
    clientY: number;
}