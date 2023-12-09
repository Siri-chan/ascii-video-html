import {_p5} from './sketch';
import p5 from 'p5';
import * as make from './dom/make';

export * from './dom/make';

export const ROOT_ELEMENT_ID = "root";
export const MEDIA_CLASS = "media";
export const SEEKER_CLASS = "seeker";

export const br = () => _p5.createDiv("<br />");

export type UI = {
    volume: Volume,
    controls: MediaControls,
    chars: CharacterSelector,
    ascii_div: p5.Element,
    item_selectors: ItemSelector,
}

export type Volume = {
    text: p5.Element,
    slider: p5.Element,
}

export type MediaControls = {
    parent_div: p5.Element,
    buttons: MediaButtons,
    seeker: Seeker,
    resolution: Resolution,
}

export type MediaButtons = {
    play_pause: p5.Element,
    redraw: p5.Element,
}

export type Seeker = {
    seeker_div: p5.Element,
    time: p5.Element,
    slider: p5.Element,
    duration: p5.Element,
    seek_btn: p5.Element,
}

export type Resolution = {
    header: p5.Element
    w: p5.Element,
    cross: p5.Element,
    h: p5.Element,
    br,
}

export type CharacterSelector = {
    header: p5.Element,
    input: p5.Element,
    br1,
    br2
}

export type ItemSelector = {
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

export let show_inline = (element: p5.Element) => {
    element.show();
    element.style("display: inline;");
  }