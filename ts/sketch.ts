import P5 from 'p5';

import * as dom from './dom.js';

interface State {
    display_chars: string,
    width: number,
    height: number,
}

//let ui: dom.UI;

const sketch = (p5: P5) => {
    p5.setup = () => {
        p5.noCanvas();
        /*ui =*/ dom.makeUI();
        p5.noLoop();
    }
}

export let _p5 = new P5(sketch);
export let state: State = {
    display_chars: ".#",
    width: 64,
    height: 36,
};
