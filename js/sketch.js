import P5 from 'p5';
import * as dom from './dom.js';
const sketch = (p5) => {
    p5.setup = () => {
        p5.noCanvas();
        dom.makeVolume();
        dom.makeMediaControls();
    };
};
let _p5 = new P5(sketch);
export default _p5;
//# sourceMappingURL=sketch.js.map