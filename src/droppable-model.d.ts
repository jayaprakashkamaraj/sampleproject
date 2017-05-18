import { Base } from './base';import { Browser } from './browser';import { isVisible, matches } from './dom';import { Property, NotifyPropertyChanges, INotifyPropertyChanged, Event } from './notify-property-change';import { EventHandler } from './event-handler';import { compareElementParent } from './util';import {Coordinates, DropInfo} from './draggable';
import {DropEventArgs} from "./droppable";

/**
 * Interface for a class Droppable
 * @private
 */
export interface DroppableModel {

    /**
     * Specifies the acceptable element selector in droppable element      */    accept?: string;

    /**
     * Defines the current score for grouping draggable and droppable.     */    scope?: string;

    /**
     * Specifies the callback function for drop event.     * @event     */    drop?: (args: DropEventArgs) => void;

    /**
     * Specifies the callback function for element over the draggable event.     * @event     */    over?: Function;

    /**
     * Specifies the callback function for element out of  the draggable event.     * @event     */    out?: Function;

}