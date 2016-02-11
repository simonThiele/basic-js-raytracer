var Color = require('../Color.js');


var LambertMaterial = function(params) {
  params = params || {};
  this.albedo = params.color || new Color(1, 1, 0);
};

LambertMaterial.prototype.constructor = LambertMaterial;

LambertMaterial.prototype.getColorForIntersection = function(intersection, scene) {
  var pointLight = scene.lights[0];

  var diffuseTerm = this.getDiffuseTerm(intersection, pointLight);

  // light intensity
  var Id = pointLight.getIntensityAtPoint(intersection.point);

  // Ia + Id
  return new Color(
     this.albedo.r * Id * pointLight.color.r * diffuseTerm,
     this.albedo.g * Id * pointLight.color.g * diffuseTerm,
     this.albedo.b * Id * pointLight.color.b * diffuseTerm
  );
};

LambertMaterial.prototype.getDiffuseTerm = function(intersection, light) {
  // Id = kd(N · L)

  // light vector
  var L = intersection.point.clone().subV(light.position).normalize();

  var kd = 1;
  return kd * Math.max(0, L.multiplyScalar(-1).dot(intersection.normal));
}

module.exports = LambertMaterial;
