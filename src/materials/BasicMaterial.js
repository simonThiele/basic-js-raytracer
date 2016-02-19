var Color = require('../Color.js');


var BasicMaterial = function(params) {
  params = params || {};
  this.albedo = params.color || new Color(1, 1, 1);
};

BasicMaterial.prototype.constructor = BasicMaterial;

BasicMaterial.prototype.getColorForIntersection = function(intersection, scene) {
  return new Color(this.albedo.r, this.albedo.g, this.albedo.b);
};

module.exports = BasicMaterial;
