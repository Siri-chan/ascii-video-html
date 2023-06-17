"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMediaControls = exports.makeVolume = void 0;
var p5 = require("../node_modules/p5");
require("./dom/interfaces");
var ROOT_ELEMENT_ID = "root";
var MEDIA_CLASS = "media";
var SEEKER_CLASS = "seeker";
var br = function () { return p5.createDiv("<br />"); };
function makeVolume() {
    return {
        text: makeVolumeText(),
        slider: makeVolumeSlider(),
        foreach_element: function (self, func) {
            func(self.text);
            func(self.slider);
        }
    };
}
exports.makeVolume = makeVolume;
function makeVolumeText() {
    return p5.createDiv("Volume: 100%<br />");
}
function makeVolumeSlider() {
    var slider = p5.createSlider(0, 100, 100);
    return slider;
}
function makeMediaControls() {
    var parent = makeMediaParentDiv();
    return {
        parent_div: parent,
        buttons: makeButtons(parent),
        seeker: makeSeeker(parent),
    };
}
exports.makeMediaControls = makeMediaControls;
function makeMediaParentDiv() {
    var mediaControls = p5.createDiv();
    mediaControls.parent(ROOT_ELEMENT_ID);
    return mediaControls;
}
function makeButtons(mediaControls) {
    return {
        play_pause: makePlayPauseButton(mediaControls),
        redraw: makeRedrawButton(mediaControls),
    };
}
function makePlayPauseButton(mediaControls) {
    var play_pause = p5.createButton("Pause");
    play_pause.parent(mediaControls);
    return play_pause;
}
function makeRedrawButton(mediaControls) {
    var redraw = p5.createButton("Redraw");
    redraw.parent(mediaControls);
    return redraw;
}
function makeSeeker(mediaControls) {
    var seeker_div = makeSeekerDiv;
    return {
        seeker_div: seeker_div
    };
}
function makeSeekerDiv(mediaControls) {
    var seeker_div = br();
    seeker_div.parent(mediaControls);
    seeker_div.class(SEEKER_CLASS);
    seeker_div.addClass(MEDIA_CLASS);
    return seeker_div;
}
//# sourceMappingURL=dom.js.map