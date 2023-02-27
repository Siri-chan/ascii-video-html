let display_chars = ".#";

let ascii_div;
let button1;
let button2;
let button3;
let video;
let video1;
let looping = false;
let video2;
let videoNumber;
let input;

function setup() {
  noCanvas();
	
  input = createInput(display_chars);
  input.addClass("dingus");	
	
  ascii_div = createDiv();
  ascii_div.html("ASCII Video by Siri-chan");
  button1 = createButton('Loading...');
  button1.addClass("disabled")
  
  //load frames for bad apple/lagtrain
  video1 = createVideo("lagtrain.mp4", spawn_button_a);
  	video1.autoplay(false);
	//video1.volume(0);
	video1.size(64, 48);
    video1.hide();
  video1.stop();
	
    video2 = createVideo("badapple.mp4", spawn_button_b);
  	video2.autoplay(false);
	//video2.volume(0);
	video2.size(64, 48);
    video2.hide();
  video2.stop();
	
	//for some reason this tries to autoplay even when i explicitlyhave autoplay(false);
    looping = false;
    noLoop();
}

let buttona = false;
let buttonb = false;

function spawn_button_a() {
  if (buttonb) {spawn_button()} 
  else {buttona = true;}
}

function spawn_button_b() {
   if (buttona) {spawn_button()} 
  else {buttonb = true;}
}

function spawn_button() {
  button1.toggleClass('disabled');
  button1.html("Play Lagtrain")
  button1.mousePressed(play_video1);
  button2 = createButton("Play Bad Apple")
  button2.mousePressed(play_video2);
  button3 = createButton("Play Webcam [WIP]")
  button3.addClass('disabled');
  button3.mousePressed(play_webcam);
}

function draw() {
	
  display_chars = input.value();	
	
  if (!looping) return;
  if (videoNumber == 2) {
    video = video2
  } else if (videoNumber == 1) {
    video = video1
  } else {
    video = createCapture(VIDEO);
  video.size(64, 48);
  }
  video.loadPixels();
  let html_ascii = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const a = video.pixels[pixelIndex + 3];
      const avg = (r + g + b) / (3*(a/255));
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

//todo fix this so the live ver uses this function and createButton()
// also add the loading button and the `if(!looping)` stuff
//noloop still runs draw once, even if noloop is called in setup.
//also add the css for buttons
function play_video1() {
  videoNumber = 1;
  looping = true;
	loop();
	video1.loop();
    button1.remove();
  button2.remove();
  button3.remove();
}
function play_video2() {
  videoNumber = 2;
  looping = true;
	loop();
	video2.loop();
    button1.remove();
  button2.remove();
    button3.remove();
}

function play_webcam() {
	videoNumber = 0;
	looping = true;
		loop();
    button1.remove();
  button2.remove();
    button3.remove();
}
