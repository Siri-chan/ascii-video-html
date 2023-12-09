import { state, _p5 } from '../sketch';
import { play_video } from '../video'; 

export function load_video(title: string) {
    if (!state.ui) { return } //todo log an error
    state.ui.item_selectors.lagtrain.html('Loading...');
    state.ui.item_selectors.lagtrain.addClass("disabled");
    state.ui.item_selectors.bad_apple.remove();
    state.ui.item_selectors.video_file.remove();
    const _video = _p5.createVideo(title, play_video);
    state.width = parseInt(state.ui.controls.resolution.w.value().toString());
    state.height = parseInt(state.ui.controls.resolution.h.value().toString());
    Object.values(state.ui.controls.resolution).forEach((el) => {
        el.hide();
    })
    _video.autoplay(false);
    //video1.volume(0);
    _video.size(state.width, state.width);
    _video.hide();
    _video.stop();
    state.video = _video;
}