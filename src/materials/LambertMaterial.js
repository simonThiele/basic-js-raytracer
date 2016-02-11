var Color = require('../Color.js');


var LambertMaterial = function(params) {
  params = params || {};
  this.albedo = params.color || new Color(1, 1, 0);
};

LambertMaterial.prototype.constructor = LambertMaterial;

LambertMaterial.prototype.getColorForIntersection = function(intersection, scene) {
  var numLights = scene.lights.length;
  var r = 0;
  var g = 0;
  var b = 0;
  for (var i = 0; i < numLights; i++) {
    var pointLight = scene.lights[i];

    var diffuseTerm = this.getDiffuseTerm(intersection, pointLight);

    // light intensity
    var Id = pointLight.getIntensityAtPoint(intersection.point);

    // Ia + Id
    r += this.albedo.r * Id * pointLight.color.r * diffuseTerm;
    g += this.albedo.g * Id * pointLight.color.g * diffuseTerm;
    b += this.albedo.b * Id * pointLight.color.b * diffuseTerm;
  }

  return new Color(r, g, b).multiplyScalar(1 / numLights);
};

LambertMaterial.prototype.getDiffuseTerm = function(intersection, light) {
  // Id = kd(N · L)

  // light vector
  var L = intersection.point.clone().subV(light.position).normalize();

  var kd = 1;
  return kd * Math.max(0, L.multiplyScalar(-1).dot(intersection.normal));
};

module.exports = LambertMaterial;
