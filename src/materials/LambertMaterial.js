var Color = require('../Color.js');


var LambertMaterial = function(params) {
  params = params || {};
  this.albedo = params.color || new Color(1, 1, 0);
};

LambertMaterial.prototype.constructor = LambertMaterial;

LambertMaterial.prototype.getColorForIntersection = function(intersection, scene) {
  var numLights = scene.lights.length;
  var allId = 0;
  var allDiffuse = 0;

  for (var i = 0; i < numLights; i++) {
    var pointLight = scene.lights[i];

    var diffuseTerm = this.getDiffuseTerm(intersection, pointLight);
    allDiffuse += diffuseTerm;

    // light intensity
    var Id = pointLight.getIntensityAtPoint(intersection.point);
    allId += Id;
  }

  allId /= numLights;
  allDiffuse /= numLights;
  var intensity = allId * allDiffuse;

  // Ia + Id
  return new Color(
    this.albedo.r * intensity * pointLight.color.r,
    this.albedo.g * intensity * pointLight.color.g,
    this.albedo.b * intensity * pointLight.color.b
  );
};

LambertMaterial.prototype.getDiffuseTerm = function(intersection, light) {
  // Id = kd(N · L)

  // light vector
  var L = intersection.point.clone().subV(light.position).normalize();

  var kd = 1;
  return kd * Math.max(0, Math.min(1, L.multiplyScalar(-1).dot(intersection.normal)));
};

module.exports = LambertMaterial;
