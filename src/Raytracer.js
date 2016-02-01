var canvasUtils = require('./canvasUtils.js');

module.exports = function Raytracer(canvas) {
  this.canvas = canvas;

  this.start = function() {
    var canvas = this.canvas;
    var width = canvas.width;
    var height = canvas.height;
    var image = canvasUtils.getImageFromCanvas(canvas);

    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        canvasUtils.setPixel(image, x, y,
          Math.random() * 256 | 0, // r
          Math.random() * 256 | 0, // g
          Math.random() * 256 | 0, // b
          256                      // a
        );
      }
    }

    canvasUtils.imageToCanvas(image, canvas);
  }
}
