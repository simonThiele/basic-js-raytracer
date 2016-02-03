var Color = require('../Color.js');


var BasicMaterial = function() {
  this.albedo = new Color();
};
BasicMaterial.prototype.constructor = BasicMaterial;

module.exports = BasicMaterial;
