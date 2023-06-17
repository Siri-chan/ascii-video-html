import * as p5 from '../node_modules/p5';
import './dom/interfaces';

const ROOT_ELEMENT_ID = "root";
const MEDIA_CLASS = "media";
const SEEKER_CLASS = "seeker";

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
}

const br = () => p5.createDiv("<br />");

export function makeVolume(): Volume {
    return {
        text: makeVolumeText(),
        slider: makeVolumeSlider(),
        foreach_element: (self, func) => {
            func(self.text);
            func(self.slider);
        }
    };
}

function makeVolumeText(): p5.Element {
    return p5.createDiv("Volume: 100%<br />");
}

function makeVolumeSlider(): p5.Element {
    const slider = p5.createSlider(0, 100, 100);
    /* todo write these
    slider.mouseMoved(updateVolume);
    slider.mouseReleased(updateVolume);
    */
    return slider;
}

export function makeMediaControls(): MediaControls {
    const parent = makeMediaParentDiv();
    return {
        parent_div: parent,
        buttons: makeButtons(parent),
        seeker: makeSeeker(parent),
    }
}

function makeMediaParentDiv(): p5.Element {
    const mediaControls = p5.createDiv();
    mediaControls.parent(ROOT_ELEMENT_ID);
    return mediaControls;
}

function makeButtons(mediaControls: p5.Element): MediaButtons {
    return {
        play_pause: makePlayPauseButton(mediaControls),
        redraw: makeRedrawButton(mediaControls),
    }
}

function makePlayPauseButton(mediaControls: p5.Element): p5.Element {
    const play_pause = p5.createButton("Pause");
    play_pause.parent(mediaControls);
    /* todo write these
    initially_hidden[0].mousePressed(togglePlay);
    */
    return play_pause;
}

function makeRedrawButton(mediaControls: p5.Element): p5.Element {
    const redraw = p5.createButton("Redraw");
    redraw.parent(mediaControls);
    /* todo write these
    initially_hidden[0].mousePressed(redraw);
    */
    return redraw;
}

function makeSeeker(mediaControls: p5.Element): Seeker {
    const seeker_div = makeSeekerDiv
    return {
        seeker_div: seeker_div
    };
}

function makeSeekerDiv(mediaControls: p5.Element): p5.Element {
    const seeker_div = br();
    seeker_div.parent(mediaControls);
    seeker_div.class(SEEKER_CLASS);
    seeker_div.addClass(MEDIA_CLASS);
    return seeker_div;
}