import { state, _p5 } from './sketch';
import { makeSeekerSlider } from './dom';
import { show_inline } from './dom';
import { seconds_to_minutes } from './util';
export { load_video } from './video/setup'

export function updateVolume() {
    if (!state.ui) { return }
    const _volume = parseInt(state.ui.volume.slider.value().toString());
    state.ui.volume.text.html("Volume: " + _volume?.toString() + "%<br />");
    state.video?.volume(_volume / 100); //todo
}

export function togglePlay() {
    if (!state.ui || !state.video) { return }
    state.paused = !state.paused;
    if (state.paused) {
        state.ui.controls.buttons.play_pause.html("Play");
        state.video.pause();
        _p5.noLoop();
    } else {
        state.ui.controls.buttons.play_pause.html("Pause");
        state.video.loop();
        _p5.loop();
    }
}

export function play_video() {
    if (!state.ui || !state.video) { return }
    state.ui.item_selectors.lagtrain.remove();
    Object.values(state.ui.controls.seeker).forEach((el) => show_inline(el))
    Object.values(state.ui.controls.buttons).forEach((el) => show_inline(el))

    const _duration = state.video.duration();
    //todo tweak seeker style
    state.ui.controls.seeker.slider = makeSeekerSlider(
        state.ui.controls.seeker.seeker_div, _duration
    );
    //todo make seeker have onchange rather than checking every update + also use a nicer monospace font for the time display
    state.ui.controls.seeker.duration.html(seconds_to_minutes(_duration));
    Object.values(state.ui.controls.seeker).forEach((el) => el.show())
    state.looping = true;
    _p5.loop();
    state.video.loop();
}
