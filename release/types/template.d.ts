import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Toolbar template class.
 */
export declare class Template extends Control.Component<Properties> {
    /**
     * Toolbar states.
     */
    private states;
    /**
     * Buttons element.
     */
    private buttonSlot;
    /**
     * Wrapper element.
     */
    private wrapper;
    /**
     * Toolbar styles.
     */
    private styles;
    /**
     * Toolbar skeleton.
     */
    private skeleton;
    /**
     * Toolbar elements.
     */
    private elements;
    /**
     * Bind exposed properties to the custom element.
     */
    private bindProperties;
    /**
     * Assign all elements properties.
     */
    private assignProperties;
    /**
     * Default constructor.
     * @param properties Toolbar properties.
     * @param children Toolbar children.
     */
    constructor(properties?: Properties, children?: any[]);
    /**
     * Get disabled state.
     */
    /**
    * Set disabled state.
    */
    disabled: boolean;
    /**
     * Get orientation mode.
     */
    /**
    * Set orientation mode.
    */
    orientation: string;
    /**
     * Toolbar element.
     */
    readonly element: Element;
}
