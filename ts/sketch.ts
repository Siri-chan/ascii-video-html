import * as p5 from '../node_modules/p5';
import * as dom from './dom';

function setup(): void {
    p5.noCanvas();
    dom.makeVolume();
}