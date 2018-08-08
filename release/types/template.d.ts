import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
import { Events } from './events';
/**
 * Toolbar template class.
 */
export declare class Template extends Control.Component<Properties> {
    /**
     * Toolbar states.
     */
    private states;
    /**
     * Toolbar events.
     */
    private subjects;
    /**
     * Toolbar groups.
     */
    private groups;
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
     * Activates the specified button element.
     * @param button Button element.
     */
    private activateButton;
    /**
     * Deactivates the specified button element.
     * @param button Button element.
     */
    private deactivateButton;
    /**
     * Toggles the specified button element.
     * @param button Button element.
     */
    private toggleButton;
    /**
     * Activates the the specified button in your respective group.
     * @param group Group name.
     * @param toggle Determines whether the button can be toggled or not.
     * @param button Button element.
     * @returns Returns true when the button is activated or deactivated, false otherwise.
     */
    private activateButtonGroup;
    /**
     * Click event handler.
     * @param event Event information.
     */
    private clickHandler;
    /**
     * Bind event handlers to update the custom element.
     */
    private bindHandlers;
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
     * Get available events.
     */
    readonly events: Events;
    /**
     * Get buttons list.
     */
    readonly buttons: HTMLElement[];
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
