import { Base } from './base';import { Browser } from './browser';import { isVisible } from './dom';import { Property, Complex, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';import { EventHandler } from './event-handler';import { ChildProperty } from './child-property';import { select, closest, setStyleAttribute, addClass, createElement } from './dom';import { extend, isUndefined, isNullOrUndefined, compareElementParent } from './util';

/**
 * Interface for a class Position
 */
export interface PositionModel {

    /**
     * Property specifies the left position of cursor in draggable.     */    left?: number;

    /**
     * Property specifies the right position of cursor in draggable.     */    right?: number;

    /**
     * Property specifies the left position of cursor in draggable.     */    top?: number;

    /**
     * Property specifies the left position of cursor in draggable.     */    bottom?: number;

}

/**
 * Interface for a class Draggable
 * @private
 */
export interface DraggableModel {

    /**
     * Change the cursor position of draggable     */    cursorAt?: PositionModel;

    /**
     * Specifies whether to clone the draggable element or not.     * @default true     */    clone?: boolean;

    /**
     * Specifies the area in which dragging to happen.     */    dragArea?: HTMLElement | string;

    /**
     * Specifies the callback function for drag event.     * @event     */    drag?: Function;

    /**
     * Specifies the callback function for dragStart event.     * @event     */    dragStart?: Function;

    /**
     * Specifies the callback function for dragStop event.     * @event     */    dragStop?: Function;

    /**
     * Specifies the minimum distance draggable element moved to perform dragging operation.     * @default 1     */    distance?: number;

    /**
     * Specifies the selector for the child element by which parent  element can be dragged.     */    handle?: string;

    /**
     * Specifies the selector for the child element to prevent the dragging of the parent element by selecting  the child.     */    abort?: string;

    /**
     * Defines the function for customizing the draggable element on cloning.     */    helper?: Function;

    /**
     * Defines the current score for grouping draggable and droppable.     */    scope?: string;

    /**
     * Specifies the dragTarget by which the clone element is positioned if not given current context element will be considered.     */    dragTarget?: string;

}