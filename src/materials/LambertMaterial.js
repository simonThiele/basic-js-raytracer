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

    // Ia + Id
    return new Color(
       this.albedo.r * pointLight.intensity * pointLight.color.r * (ambientTerm.r + diffuseTerm),
       this.albedo.g * pointLight.intensity * pointLight.color.g * (ambientTerm.g + diffuseTerm),
       this.albedo.b * pointLight.intensity * pointLight.color.b * (ambientTerm.b + diffuseTerm)
    );
  }
};
LambertMaterial.prototype.constructor = LambertMaterial;

module.exports = LambertMaterial;
