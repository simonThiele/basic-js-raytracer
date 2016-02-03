var Color = require('../Color.js');


var BasicMaterial = function(params) {
  params = params || {};
  this.albedo = params.color || new Color(255, 255, 0);


  this.getColorForIntersection = function(intersection) {
    var diffuseFalloff = intersection.ray.direction.multiplyScalar(-1).dot(intersection.normal);
    return new Color(
      diffuseFalloff * 255,
      0,
      0
    );
  }
};
BasicMaterial.prototype.constructor = BasicMaterial;

module.exports = BasicMaterial;
