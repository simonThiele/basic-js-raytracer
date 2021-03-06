var DefaultScene = require('./scenes/DefaultScene.js');
var canvasUtils = require('./canvasUtils.js');
var Ray = require('./sceneObjects/Ray.js');


var Raytracer = function(canvas) {
  this.canvas = canvas;
};

Raytracer.prototype.start = function() {
  var canvas = this.canvas;
  var width = canvas.width;
  var height = canvas.height;
  var image = canvasUtils.getImageFromCanvas(canvas);

  var scene = new DefaultScene();
  scene.load(width, height);

  // store ray to reduce object creation
  var primaryRay = new Ray();

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {

      var normX = 2 * ((x + 0.5) / width) - 1; // [-1, 1]
      var normY = 2 * ((y + 0.5) / height) - 1; // [-1, 1]

      // flip y
      normY *= -1;

      primaryRay.position.setV(scene.camera.position);
      primaryRay.direction.set(
        normX * scene.camera.viewPlaneWidth, // aspect is not needed here anymore
        normY * scene.camera.viewPlaneHeight,
        scene.camera.direction.z);
      primaryRay.direction.normalize();

      var color = scene.traceRay(primaryRay, 0);
      canvasUtils.setPixel(image, x, y, color.r, color.g, color.b, 1);
    }
  }

  canvasUtils.imageToCanvas(image, canvas);
};

module.exports = Raytracer;
