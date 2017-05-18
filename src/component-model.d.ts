import { isUndefined, getValue, isNullOrUndefined, setValue, getUniqueID } from './util';import { ModuleLoader, ModuleDeclaration } from './module-loader';import { Base } from './base';import { Observer, BoundOptions } from './observer';import { ChildProperty } from './child-property';import { Property, NotifyPropertyChanges } from './notify-property-change';import { onIntlChange, rightToLeft, defaultCulture } from './internationalization';

/**
 * Interface for a class Component
 */
export interface ComponentModel {

    /**
     * Enable or disable persisting component's state between page reloads.     */    enablePersistence?: boolean;

    /**
     * Enable or disable rendering component in right to left direction.     */    enableRtl?: boolean;

    /**
     * Overrides the global culture and localization value for this component.     */    locale?: string;

}