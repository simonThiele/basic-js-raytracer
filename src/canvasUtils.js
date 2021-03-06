module.exports = {
  getImageFromCanvas: function(canvas) {
    var context = canvas.getContext('2d');
    return context.createImageData(canvas.width, canvas.height);
  },

  imageToCanvas: function(imageData, canvas) {
    var context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0); // at coords 0, 0
  },

  setPixel: function(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = (r * 255) | 0;
    imageData.data[index + 1] = (g * 255) | 0;
    imageData.data[index + 2] = (b * 255) | 0;
    imageData.data[index + 3] = (a * 255) | 0;
  }
};
