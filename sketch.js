/* DOM Elements */
let ascii_div;
// Volume Text, Volume Slider, "Character Set" text, character set input
const preserved_header_settings = [];
// Resolution Text, Width Input, div that says 'x', Height Input
const initially_shown_not_preserved = [];
// play/pause, redraw, seeker
const initially_hidden = [];

// todo implement algorithm for images
//let drop_image_button;
let duration_str;
let seeker;
let seeker_div;

// Render Parameters
let display_chars = ".#";
let width = 64;
let height = 36;

// Playback Variables
let video;
let looping = false;
let paused = false;

// Other
let video_exists = false;


function setup() {
  noCanvas();

  preserved_header_settings[0] = createDiv("Volume: 100%<br />");
  preserved_header_settings[1] = createSlider(0, 100, 100);
  preserved_header_settings[1].mouseMoved(updateVolume);
  preserved_header_settings[1].mouseReleased(updateVolume);


  //todo add a stop button
  const mediaControls = createDiv();
  mediaControls.parent("based");
  initially_hidden[0] = createButton("Pause");
  initially_hidden[0].mousePressed(togglePlay);

  initially_hidden[1] = createButton("Redraw");
  initially_hidden[1].mousePressed(redraw);

  seeker_div = createDiv("<br />");
  seeker_div.parent(mediaControls);
  seeker_div.class("seeker");
  seeker_div.addClass("media");
  initially_hidden[2] = createDiv("0:00");
  initially_hidden[2].parent(seeker_div);
  initially_hidden[2].class("seeker");

  for (let i = 0; i <= 1; i++) {
    initially_hidden[i].parent(mediaControls);
  }
  for (let i = 0; i <= 2; i++) {
    initially_hidden[i].addClass("media");
    initially_hidden[i].hide();
  }
  
  initially_shown_not_preserved[0] = createDiv("Resolution:<br />");
  initially_shown_not_preserved[1] = createInput(str(width));
  initially_shown_not_preserved[3] = createDiv("x")
  initially_shown_not_preserved[2] = createInput(str(height));

  for (let i = 0; i <= 3; i++) {
    initially_shown_not_preserved[i].parent(mediaControls);
  }
  
  preserved_header_settings[2] = createDiv("<br />Character Set:");
  preserved_header_settings[3] = createInput(display_chars);
  preserved_header_settings[3].addClass("dingus");
  preserved_header_settings[4] = createDiv("<br />");
  preserved_header_settings[5] = createDiv("<br />");
  ascii_div = createDiv("ASCII Video by Siri-chan");
  initially_shown_not_preserved[4] = createDiv("<br />");
  spawn_buttons();
  //for some reason this tries to autoplay even when i explicitlyhave autoplay(false);
  looping = false;
  noLoop();

  for (let i = 0; i <= 4; i++) {
    preserved_header_settings[i].parent("based");
  }
}

function togglePlay() {
  paused = !paused;
  if (paused) {
    initially_hidden[0].html("Play");
    video.pause();
    noLoop();
  } else {
    initially_hidden[0].html("Pause");
    video.loop();
    loop();
  }
}

function video_generics(_video) {
  width = int(initially_shown_not_preserved[1].value());
  height = int(initially_shown_not_preserved[2].value());

  for (let i = 0; i <= 3; i++) {
    initially_shown_not_preserved[i].hide();
  }

  _video.autoplay(false);
  //video1.volume(0);
  _video.size(width, height);
  _video.hide();
  _video.stop();
}

function load_lagtrain() {
  const _video = createVideo("lagtrain.mp4", play_video);
  video_generics(_video);
  return _video;
}

function load_bad_apple() {
  const _video = createVideo("badapple.mp4", play_video);
  video_generics(_video);
  return _video;
}

function spawn_buttons() {
  initially_shown_not_preserved[5] = createButton("Play Lagtrain")
  initially_shown_not_preserved[5].mousePressed(play_lagtrain);
  initially_shown_not_preserved[6] = createButton("Play Bad Apple")
  initially_shown_not_preserved[6].mousePressed(play_badapple);
  initially_shown_not_preserved[7] = createDiv("<br />");
  initially_shown_not_preserved[8] = createButton("Drop a Video File")
  initially_shown_not_preserved[8].mousePressed(clickVideoDropButton);
  show_inline(initially_shown_not_preserved[8]);
  initially_shown_not_preserved[8].style("width: 50%;")
}

clickVideoDropButton = () => {
  clickDropButton();
}

function clickDropButton() {
  initially_shown_not_preserved[8].remove();
  //drop_image_button.remove();
  initially_shown_not_preserved[9] = createButton("Drop a File Here")
  initially_shown_not_preserved[9].drop(play_dropped_video);
  initially_shown_not_preserved[9].class("drop_here");
}

function load_dropped_video(file) {
  // file.data is the binary stream
  // according to the docs for Element.drop() this should work
  initially_shown_not_preserved[9].remove();
  const _video = createVideo(file.data, play_video);
  video_generics(_video);
  return _video;
}

function updateVolume() {
  const _volume = preserved_header_settings[1].value();
  preserved_header_settings[0].html("Volume: " + str(_volume) + "%<br />");
  if (video_exists)
    video.volume(_volume/100);
}

function draw() {
  if (!looping) return;

  display_chars = preserved_header_settings[3].value();
  initially_hidden[2].html(seconds_to_minutes(seeker.value()));

  video.loadPixels();
  let html_ascii = "";
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const pixelIndex = (i + j * width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const a = video.pixels[pixelIndex + 3];
      let avg = (r + g + b) / (a / 255);
      if (r != 0 && g != 0 && b != 0) {
        avg = constrain(avg, 0, 764.9);
      }
      const len = display_chars.length;
      const charIndex = floor(map(avg, 0, 765, 0, len));
      const cchar = display_chars.charAt(charIndex);
      if (cchar == " ") html_ascii += "&nbsp;";
      else html_ascii += cchar;
    }
    html_ascii += '<br/>';
  }
  ascii_div.html(html_ascii);
}

function play_lagtrain() {
  play_generics();
  video = load_lagtrain();
}

function play_badapple() {
  play_generics();
  video = load_bad_apple();
}

function play_dropped_video(file) {
  alert("This feature is experimental; and there are a few known bugs:\n\n"
  + "1: If you upload a corrupted or non-video file, the program will crash and not tell you anything about the issue.\n"
  + "2: Automatic Looping can bug the audio. if this happens, seek to 0:00.00 and it should work again.\n"
  + "3: The player only supports videos supported by p5.js. While I don't know every type of video p5 supports, know that MKV and WMV do not work.\n"
  + "I suggest using ffmpeg to convert the file to MP4 or WEBM, as I know for certain they are supported.\n"
  + "4: If you delete the video file on your computer, it will stop playing.\n\n"
  + "By pressing OK, you are willing to try an experimental feature, and are able to fix these common bugs.");
  play_generics();
  video = load_dropped_video(file);
  initially_shown_not_preserved[7].remove();
}

function play_generics() {
  initially_shown_not_preserved[5].html('Loading...');
  initially_shown_not_preserved[5].addClass("disabled");
  initially_shown_not_preserved[6].remove();
  initially_shown_not_preserved[8].remove();
  video_exists = true;
}

//todo play_webcam

show_inline = (element) => {
  element.show();
  element.style("display: inline;");
}

function play_video() {
  initially_shown_not_preserved[5].remove();
  for (let i = 0; i <= 2; i++) {
  show_inline(initially_hidden[1]);
  }
  const _duration = video.duration();
  //todo tweak seeker style
  seeker = createSlider(0, _duration, 1, 0);
  seeker.parent(seeker_div);
  //todo make seeker have onchange rather than checking every update + also use a nicer monospace ffont for the time display
  seeker.class("seeker");
  seeker.addClass("media");
  duration_str = createDiv(seconds_to_minutes(_duration));
  duration_str.parent(seeker_div);
  duration_str.class("seeker");
  duration_str.addClass("media");
  const seek_btn = createButton("Seek");
  seek_btn.parent(seeker_div);
  seek_btn.style("display:block; font-family: 'Overpass', sans-serif; font-size: 10px");
  seek_btn.mousePressed(seek);
  seek_btn.class("seeker");
  seek_btn.addClass("media");
  looping = true;
  loop();
  video.loop();
}

seek = () => video.time(seeker.value());

function seconds_to_minutes(n) {
  const minutes = floor(n/60);
  const seconds = floor(n%60);
  const ms = floor(((n%60) * 100) - (seconds * 100));
  let seconds_str = str(seconds);
  if (seconds < 10) {
    seconds_str = "0" + seconds_str;
  }
  let ms_str = str(ms);
  if (ms < 10) {
    ms_str = "0" + ms_str;
  }
  return str(minutes)+":"+seconds_str+"."+ms_str;
}
