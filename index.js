// Get the canvas element we want to render
var canvas = document.getElementById('canvas');
// Get the rendering context so we can draw the the canvas
var ctx = canvas.getContext('2d');
// Keep track of which keys are pressed, which mouse buttons are
// pressed, and the position of the mouse
var keyboardState = new Set();
var mouseState = {
  x: 0, y: 0,
  left: false, right: false, middle: false,
};

// TODO: declare global variables here, usually things updated in update()
// or drawn in draw()
var exampleObject = {
  position: 0,
  velocity: 1
};

// TODO: add image names and file paths to imagesToPreload, to be accessed
// later in the images object. Don't modify the images object manually.
var imagesToPreload = {
  spaceship: 'assets/spaceship.png'
};
var images = {};

// Update positions, velocities, colors, etc of objects
// involved in the animation.
function update() {
  // TODO: Your code here
  exampleObject.position += exampleObject.velocity;
}

// Called every 60th of a second
function draw() {
  // TODO: Your code here, using the ctx variable to draw to the canvas.
  // See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
  // for functions you can use to draw.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Endlessly call update and draw 60 times a second
function updateDrawLoop() {
  // Schedule another call of this function
  requestAnimationFrame(updateDrawLoop);
  // Make the canvas expand to fill the window
  if (canvas.width !== window.innerWidth ||
      canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  update();
  draw();
}

// Preloads images before starting the update/draw loop.
// Adds event handlers for key presses and mouse movements/clicks.
// Wrap in a function to avoid further polluting the global scope.
(function() {
  // Preload images
  var numLoaded = 0;
  var numExpected = 0;
  function imageLoaded() {
    numLoaded++;
    if (numExpected === numLoaded) {
      updateDrawLoop();
    }
  }
  for (var name in imagesToPreload) {
    if (!imagesToPreload.hasOwnProperty(name)) {
      continue;
    }
    numExpected++;
    images[name] = new Image();
    images[name].onload = images[name].onerror = imageLoaded;
    images[name].src = imagesToPreload[name];
  }
  // Add input handlers
  canvas.addEventListener('keydown', function (event) {
    keyboardState.add(event.key.toLowerCase());
  });
  canvas.addEventListener('keyup', function (event) {
    keyboardState.delete(event.key.toLowerCase());
  });
  function mouseEventHandler(event) {
    mouseState.x = event.clientX;
    mouseState.y = event.clientY;
    mouseState.left = (event.buttons & 0x1) == 1;
    mouseState.right = (event.buttons & 0x2) == 1;
    mouseState.middle = (event.buttons & 0x4) == 1;
  }
  canvas.addEventListener('mouseenter', mouseEventHandler);
  canvas.addEventListener('mouseleave', mouseEventHandler);
  canvas.addEventListener('mousedown', mouseEventHandler);
  canvas.addEventListener('mouseup', mouseEventHandler);
  canvas.addEventListener('mousemove', mouseEventHandler);
  canvas.focus();
})();
