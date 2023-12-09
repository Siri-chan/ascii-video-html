import p5 from "p5";

declare module 'p5' {
    export interface MediaElement {
        loadPixels(): void;
        pixels: number[];
    }
}