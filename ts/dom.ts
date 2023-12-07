import {_p5} from './sketch.js';
import p5 from 'p5';
import * as make from './dom/make.js';

export * from './dom/make.js';

export const ROOT_ELEMENT_ID = "root";
export const MEDIA_CLASS = "media";
export const SEEKER_CLASS = "seeker";

export const br = () => _p5.createDiv("<br />");

export interface UI {
    volume: Volume,
    controls: MediaControls,
    chars: CharacterSelector,
    ascii_div: p5.Element,
    item_selectors: ItemSelector,
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
    resolution: Resolution,
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
    br
}

export interface CharacterSelector {
    header: p5.Element,
    input: p5.Element,
    br1,
    br2
}

export interface ItemSelector {
    lagtrain: p5.Element,
    bad_apple: p5.Element,
    br,
    video_file: p5.Element
}


export function makeUI(): UI {
    return {
        volume: make.makeVolume(),
        controls: make.makeMediaControls(),
        chars: make.makeCharacterSelector(),
        ascii_div: _p5.createDiv("ASCII Video by Siri-chan"),
        item_selectors: make.makeItemSelector(),
    }
}