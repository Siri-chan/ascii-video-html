let display_chars = ".#";

let ascii_div;
let button1;
let button2;
let button3;
let video;
let looping = false;
let videoNumber;
let char_input;

//video width and height
const w = 64;
const h = 48;

function setup() {
  noCanvas();
  char_input = createInput(display_chars);
  char_input.addClass("dingus");
  ascii_div = createDiv();
  ascii_div.html("ASCII Video by Siri-chan");
  spawn_buttons();
  //for some reason this tries to autoplay even when i explicitlyhave autoplay(false);
  looping = false;
  noLoop();
}

function video_generics(_video) {
  _video.autoplay(false);
  //video1.volume(0);
  _video.size(w, h);
  _video.hide();
  _video.stop();
}

function load_lagtrain() {
  let _video = createVideo("lagtrain.mp4", play_video);
  video_generics(_video);
  return _video;
}

function load_bad_apple() {
  let _video = createVideo("badapple.mp4", play_video);
  video_generics(_video);
  return _video;
}

function spawn_buttons() {
  button1 = createButton("Play Lagtrain")
  button1.mousePressed(play_video1);
  button2 = createButton("Play Bad Apple")
  button2.mousePressed(play_video2);
  button3 = createButton("Play Webcam [WIP]")
  button3.addClass('disabled');
  //button3.mousePressed(play_webcam);
}

function draw() {
  display_chars = char_input.value();
  if (!looping) return;
  video.loadPixels();
  let html_ascii = "";
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const pixelIndex = (i + j * w) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const a = video.pixels[pixelIndex + 3];
      const avg = (r + g + b) / (3 * (a / 255));
      const len = display_chars.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const cchar = display_chars.charAt(charIndex);
      if (cchar == " ") html_ascii += "&nbsp;";
      else html_ascii += cchar;
    }
    html_ascii += '<br/>';
  }
  ascii_div.html(html_ascii);
}

//noloop still runs draw once, even if noloop is called in setup.
function play_video1() {
  videoNumber = 1;
  button1.html('Loading...');
  button1.addClass("disabled");
  video = load_lagtrain();
}

function play_video2() {
  videoNumber = 2;
  button1.html('Loading...');
  button1.addClass("disabled");
  video = load_bad_apple();
}

function play_webcam() {
  //todo
}

function play_video() {
  looping = true;
  loop();
  video.loop();
  button1.remove();
  button2.remove();
  button3.remove();
}