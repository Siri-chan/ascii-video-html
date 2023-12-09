import P5 from 'p5';

import * as dom from './dom';
import { seconds_to_minutes } from './util';

interface State {
    display_chars: string,
    width: number,
    height: number,
    volume: number,
    ui: dom.UI | undefined,
    paused: boolean,
    video: P5.MediaElement | undefined,
    looping: boolean,
}

let ui: dom.UI;

const sketch = (p5: P5) => {
    p5.setup = () => {
        p5.noCanvas();
        ui = dom.makeUI();
        state.ui = ui;
        p5.noLoop();
    }

    p5.draw = () => {
        if (!state.ui || !state.video || !state.looping) return;
      
        state.display_chars = state.ui.chars.input.value().toString();
        state.ui.controls.seeker.time.html(seconds_to_minutes(parseInt(state.ui.controls.seeker.slider.value().toString())));

        state.video.loadPixels();
        p5.loadPixels()
        let html_ascii = "";
        for (let j = 0; j < state.height; j++) {
          for (let i = 0; i < state.width; i++) {
            const pixelIndex = (i + j * state.width) * 4;
            const r = state.video.pixels[pixelIndex + 0];
            const g = state.video.pixels[pixelIndex + 1];
            const b = state.video.pixels[pixelIndex + 2];
            const a = state.video.pixels[pixelIndex + 3];
            let avg = (r + g + b) / (a / 255);
            if (r != 0 && g != 0 && b != 0) {
              avg = p5.constrain(avg, 0, 764.9);
            }
            const len = state.display_chars.length;
            const charIndex = Math.floor(p5.map(avg, 0, 765, 0, len));
            const cchar = state.display_chars.charAt(charIndex);
            if (cchar == " ") html_ascii += "&nbsp;";
            else html_ascii += cchar;
          }
          html_ascii += '<br/>';
        }
        state.ui.ascii_div.html(html_ascii);
      }
}

export let _p5 = new P5(sketch);
export let state: State = {
    display_chars: ".#",
    width: 64,
    height: 36,
    volume: 0,
    ui: undefined,
    paused: true,
    video: undefined,
    looping: true,
};

