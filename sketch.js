let display_chars = ".#";

let ascii_div;
let button1;
let button2;
let button3;
let video;
let looping = false;
let videoNumber;
let char_input;
let slider;
let volumeText;
let play_pause;
let _redraw;
let paused = false;

let duration_str;
let seeker;
let initial_time;
let seeker_div;

//video width and height
let w = 128;
let h = 72;

function setup() {
  noCanvas();

  volumeText = createDiv("Volume: 100%<br />");
  volumeText.parent("based");
  slider = createSlider(0, 100, 100);
  slider.parent("based");
  slider.mouseMoved(updateVolume);
  slider.mouseReleased(updateVolume);


  //todo add a stop button
  let mediaControls = createDiv();
  mediaControls.parent("based");
  play_pause = createButton("Pause");
  play_pause.mousePressed(togglePlay);
  play_pause.parent(mediaControls);
  play_pause.addClass("media");
  play_pause.hide();
  _redraw = createButton("Redraw");
  _redraw.mousePressed(redraw);
  _redraw.parent(mediaControls);
  _redraw.addClass("media");
  _redraw.hide();
  seeker_div = createDiv("<br />");
  seeker_div.parent(mediaControls);
  seeker_div.class("seeker");
  seeker_div.addClass("media");
  initial_time = createDiv("0:00");
  initial_time.parent(seeker_div);
  initial_time.class("seeker");
  initial_time.addClass("media");
  initial_time.hide();

  let _div = createDiv("<br />Character Set:");
  _div.parent("based");
  char_input = createInput(display_chars);
  char_input.parent("based");
  char_input.addClass("dingus");
  let _div2 = createDiv("<br />");
  _div2.parent("based");
  let _div3 = createDiv("<br />");
  ascii_div = createDiv("ASCII Video by Siri-chan");
  spawn_buttons();
  //for some reason this tries to autoplay even when i explicitlyhave autoplay(false);
  looping = false;
  noLoop();
}

function togglePlay() {
  paused = !paused;
  if (paused) {
    play_pause.html("Play");
    video.pause();
    noLoop();
  } else {
    play_pause.html("Pause");
    video.play();
    loop();
  }
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

function updateVolume() {
   let _volume = slider.value();
  volumeText.html("Volume: " + str(_volume) + "%<br />");
  video.volume(_volume/100);
}

function draw() {
  if (!looping) return;

  display_chars = char_input.value();
  initial_time.html(seconds_to_minutes(seeker.value()));

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
  button2.remove();
  button3.remove();
  video = load_lagtrain();
}

function play_video2() {
  videoNumber = 2;
  button1.html('Loading...');
  button1.addClass("disabled");
  button2.remove();
  button3.remove();
  video = load_bad_apple();
}

function play_webcam() {
  //todo
}

function show_inline(element){
    element.show();
  element.style("display: inline;");
}

function play_video() {
  button1.remove();
  show_inline(play_pause);
  show_inline(_redraw);
  show_inline(initial_time);
  let _duration = video.duration();
  //todo tweak seeker style
  seeker = createSlider(0, _duration, 1, 0);
  seeker.parent(seeker_div);
    seeker.class("seeker");
  seeker.addClass("media");
  duration_str = createDiv(seconds_to_minutes(_duration));
  duration_str.parent(seeker_div);
    duration_str.class("seeker");
  duration_str.addClass("media");
  let seek_btn = createButton("Seek");
  seek_btn.parent(seeker_div);
  seek_btn.style("display:block");
  seek_btn.mousePressed(seek);
    seek_btn.class("seeker");
  seek_btn.addClass("media");
  looping = true;
  loop();
  video.loop();
}

function seek() {
  video.time(seeker.value());
}

function seconds_to_minutes(n) {
  let minutes = floor(n/60);
  let seconds = floor(n%60);
  let ms = floor(((n%60) * 100) - (seconds * 100));
  let seconds_str = str(seconds);
  if (seconds < 10) {
    seconds_str = "0"+str(seconds);
  }
  return str(minutes)+":"+seconds_str+"."+str(ms);
}
