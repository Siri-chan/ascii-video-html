import p5 from 'p5';

import { state, _p5 } from '../sketch';
import * as dom from '../dom';
import { togglePlay, updateVolume, load_video } from '../video';

export function makeVolume(): dom.Volume {
    return {
        text: makeVolumeText(),
        slider: makeVolumeSlider(),
    };
}

function makeVolumeText(): p5.Element {
    return _p5.createDiv("Volume: 100%<br />");
}

function makeVolumeSlider(): p5.Element {
    const slider = _p5.createSlider(0, 100, state.volume);
    slider.mouseMoved(updateVolume);
    slider.mouseReleased(updateVolume);
    return slider;
}

export function makeMediaControls(): dom.MediaControls {
    const parent = makeMediaParentDiv();
    return {
        parent_div: parent,
        buttons: makeButtons(parent),
        seeker: makeSeeker(parent),
        resolution: makeResolution(parent)
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
    play_pause.mousePressed(togglePlay);
    return play_pause;
}

function makeRedrawButton(mediaControls: p5.Element): p5.Element {
    const redraw = _p5.createButton("Redraw");
    redraw.parent(mediaControls);
    redraw.addClass(dom.MEDIA_CLASS);
    redraw.hide();
    redraw.mousePressed(_p5.redraw);
    return redraw;
}

function makeSeeker(mediaControls: p5.Element): dom.Seeker {
    const seeker_div = makeSeekerDiv(mediaControls)
    return {
        seeker_div: seeker_div,
        time: makeSeekerTime(seeker_div),
        slider: makeSeekerSlider(seeker_div, 0),
        duration: makeSeekerDuration(seeker_div),
        seek_btn: makeSeekButton(seeker_div)
    };
}

function makeSeekerDiv(mediaControls: p5.Element): p5.Element {
    const seeker_div = dom.br();
    seeker_div.parent(mediaControls);
    seeker_div.class(dom.SEEKER_CLASS);
    seeker_div.addClass(dom.MEDIA_CLASS);
    return seeker_div;
}

export function makeSeekerSlider(seeker_div: p5.Element, duration: number): p5.Element {
    let slider = _p5.createSlider(0, duration, 0, 0);
    slider.parent(seeker_div);
    slider.class(dom.SEEKER_CLASS);
    slider.addClass(dom.MEDIA_CLASS);
    slider.hide();
    return slider;
}

function makeSeekerTime(seeker_div: p5.Element): p5.Element {
    let time = _p5.createDiv("0:00");
    time.parent(seeker_div);
    time.class(dom.SEEKER_CLASS);
    time.addClass(dom.MEDIA_CLASS);
    time.hide();
    return time;
}

function makeSeekerDuration(seeker_div: p5.Element): p5.Element {
    let time = _p5.createDiv("0:00");
    time.parent(seeker_div);
    time.class(dom.SEEKER_CLASS);
    time.addClass(dom.MEDIA_CLASS);
    time.hide();
    return time;
}

function makeSeekButton(seeker_div: p5.Element): p5.Element {
    const seek_btn = _p5.createButton("Seek");
    seek_btn.parent(seeker_div);
    seek_btn.style("display:block; font-family: 'Overpass', sans-serif; font-size: 10px");
    seek_btn.mousePressed(() => {
        if (!state.ui || !state.video) return
        state.video.time(parseFloat(state.ui.controls.seeker.slider.value().toString()))
    });
    seek_btn.class("seeker");
    seek_btn.addClass("media");
    seek_btn.hide()
    return seek_btn;
}

function makeResolution(mediaControls: p5.Element): dom.Resolution {
    return {
        header: makeResolutionHeader(mediaControls),
        w: makeResolutionWidth(mediaControls),
        cross: makeResolutionCross(mediaControls),
        h: makeResolutionHeight(mediaControls),
        br: dom.br(),
    }
}

function makeResolutionHeader(mediaControls: p5.Element): p5.Element {
    let header = _p5.createDiv("Resolution:<br />");
    header.parent(mediaControls);
    return header;
}

function makeResolutionWidth(mediaControls: p5.Element): p5.Element {
    let input = _p5.createInput(state.width.toString());
    input.parent(mediaControls);
    return input;
}

function makeResolutionCross(mediaControls: p5.Element): p5.Element {
    let header = _p5.createDiv("×");
    header.parent(mediaControls);
    return header;
}

function makeResolutionHeight(mediaControls: p5.Element): p5.Element {
    let input = _p5.createInput(state.height.toString());
    input.parent(mediaControls);
    return input;
}

export function makeCharacterSelector(): dom.CharacterSelector {
    let cs = {
        header: makeCharacterSelectorHeader(),
        input: makeCharacterSelectorInput(),
        br1: dom.br(),
        br2: dom.br(),
    }
    cs.br1.parent(dom.ROOT_ELEMENT_ID);
    cs.br2.parent(dom.ROOT_ELEMENT_ID);
    return cs;
}

function makeCharacterSelectorHeader(): p5.Element {
    let header = _p5.createDiv("<br />Character Set:")
    header.parent(dom.ROOT_ELEMENT_ID);
    return header;
}

function makeCharacterSelectorInput(): p5.Element {
    let input = _p5.createInput(state.display_chars);
    input.parent(dom.ROOT_ELEMENT_ID);
    return input;
}

export function makeItemSelector(): dom.ItemSelector {
    return {
        lagtrain: makeLagtrainButton(),
        bad_apple: makeBadAppleButton(),
        br: dom.br(),
        video_file: makeDropVideoButton()
    }
}

function makeLagtrainButton(): p5.Element {
    let button = _p5.createButton("Play Lagtrain");
    button.mousePressed(() => load_video("lagtrain.mp4"));
    return button;
}

function makeBadAppleButton(): p5.Element {
    let button = _p5.createButton("Play Bad Apple");
    button.mousePressed(() => load_video("badapple.mp4"));
    return button;
}

function makeDropVideoButton(): p5.Element {
    let button = _p5.createButton("Drop a Video File");
    button.mousePressed(/* TODO: need to write a `clickDropButton` function */() => { });
    button.show();
    button.style("display: inline; width: 50%;");
    return button;
}