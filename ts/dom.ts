import _p5 from './sketch.js';
import p5 from 'p5';

export * from './dom/make.js';

export const ROOT_ELEMENT_ID = "root";
export const MEDIA_CLASS = "media";
export const SEEKER_CLASS = "seeker";

export const br = () => _p5.createDiv("<br />");

export interface UI {
    volume: Volume,
    controls: MediaControls,
}

export interface Volume {
    text: p5.Element,
    slider: p5.Element,
    foreach_element: (self: Volume, func: (element: p5.Element) => void) => void,
}

export interface MediaControls {
    parent_div: p5.Element,
    buttons: MediaButtons,
    seeker: Seeker,
}

export interface MediaButtons {
    play_pause: p5.Element,
    redraw: p5.Element,
}

export interface Seeker {
    seeker_div: p5.Element,
    time: p5.Element
}

export interface Resolution {
    header: p5.Element
    w: p5.Element,
    cross: p5.Element,
    h: p5.Element,
}