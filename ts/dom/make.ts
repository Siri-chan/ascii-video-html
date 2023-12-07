import p5 from 'p5';

import _p5 from '../sketch.js';

import * as dom from '../dom.js';

export function makeVolume(): dom.Volume {
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
    return _p5.createDiv("Volume: 100%<br />");
}

function makeVolumeSlider(): p5.Element {
    const slider = _p5.createSlider(0, 100, 100);
    /* todo write these
    slider.mouseMoved(updateVolume);
    slider.mouseReleased(updateVolume);
    */
    return slider;
}

export function makeMediaControls(): dom.MediaControls {
    const parent = makeMediaParentDiv();
    return {
        parent_div: parent,
        buttons: makeButtons(parent),
        seeker: makeSeeker(parent),
    }
}

function makeMediaParentDiv(): p5.Element {
    const mediaControls = _p5.createDiv();
    mediaControls.parent(dom.ROOT_ELEMENT_ID);
    return mediaControls;
}

function makeButtons(mediaControls: p5.Element): dom.MediaButtons {
    return {
        play_pause: makePlayPauseButton(mediaControls),
        redraw: makeRedrawButton(mediaControls),
    }
}

function makePlayPauseButton(mediaControls: p5.Element): p5.Element {
    const play_pause = _p5.createButton("Pause");
    play_pause.parent(mediaControls);
    play_pause.addClass(dom.MEDIA_CLASS);
    play_pause.hide();
    /* todo write these
    initially_hidden[0].mousePressed(togglePlay);
    */
    return play_pause;
}

function makeRedrawButton(mediaControls: p5.Element): p5.Element {
    const redraw = _p5.createButton("Redraw");
    redraw.parent(mediaControls);
    redraw.addClass(dom.MEDIA_CLASS);
    redraw.hide();
    /* todo write these
    initially_hidden[0].mousePressed(redraw);
    */
    return redraw;
}

function makeSeeker(mediaControls: p5.Element): dom.Seeker {
    const seeker_div = makeSeekerDiv(mediaControls)
    return {
        seeker_div: seeker_div,
        time: makeSeekerTime(seeker_div)
    };
}

function makeSeekerDiv(mediaControls: p5.Element): p5.Element {
    const seeker_div = dom.br();
    seeker_div.parent(mediaControls);
    seeker_div.class(dom.SEEKER_CLASS);
    seeker_div.addClass(dom.MEDIA_CLASS);
    return seeker_div;
}

function makeSeekerTime(seeker_div: p5.Element): p5.Element {
    let time = _p5.createDiv("0:00");
    time.parent(seeker_div);
    time.class(dom.SEEKER_CLASS);
    time.addClass(dom.MEDIA_CLASS);
    time.hide();
    return time;
}