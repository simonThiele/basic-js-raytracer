var Color = require('../Color.js');


var LambertMaterial = function(params) {
  params = params || {};
  this.albedo = params.color || new Color(1, 1, 0);


  this.getDiffuseTerm = function(intersection, light) {
    // Id = kd(N · L)

    // light vector
    var L = intersection.point.clone().subV(light.position).normalize();

    var kd = 1;
    return kd * L.multiplyScalar(-1).dot(intersection.normal);
  }

  this.getColorForIntersection = function(intersection, scene) {
    var pointLight = scene.lights[0];

    var ambientTerm = new Color();
    scene.ambientLights.forEach(function(ambientLight) {
      ambientTerm.add(ambientLight.color);
    })

    var diffuseTerm = this.getDiffuseTerm(intersection, pointLight);

    // light intensity
    var Id = pointLight.getIntensityAtPoint(intersection.point);

    // Ia + Id
    return new Color(
       ambientTerm.r + this.albedo.r * Id * pointLight.color.r * diffuseTerm,
       ambientTerm.r + this.albedo.g * Id * pointLight.color.g * diffuseTerm,
       ambientTerm.r + this.albedo.b * Id * pointLight.color.b * diffuseTerm
    );
  }
};
LambertMaterial.prototype.constructor = LambertMaterial;

module.exports = LambertMaterial;
