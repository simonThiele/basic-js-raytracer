var LambertMaterial = require('./LambertMaterial.js');
var VectorUtils = require('../math/VectorUtils.js');
var Color = require('../Color.js');


var PhongMaterial = function(params) {
  LambertMaterial.call(this, params);

  params = params || {};
  this.shininess = params.shininess || 1;


  this.getColorForIntersection = function(intersection, scene) {
    var pointLight = scene.lights[0];

    // view vector
    var V = scene.camera.position.clone().subV(intersection.point).normalize();

    // light vector
    var L = pointLight.position.clone().subV(intersection.point);

    // reflected light vecotr
    var R = VectorUtils.reflect(L, intersection.normal).normalize();

    var ambientTerm = new Color();
    scene.ambientLights.forEach(function(ambientLight) {
      ambientTerm.add(ambientLight.color);
    })

    // Ip * ks * (V * R)^n
    var ks = 1;
    var specularTerm = ks * Math.pow(Math.max(0, V.dot(R)), this.shininess);

    var diffuseTerm = this.getDiffuseTerm(intersection, pointLight);

    // Ia + Id + Is => Ia + Ip · [kd(N · L) + ks(V · R)^n]
    return new Color(
       this.albedo.r * pointLight.intensity * pointLight.color.r * (ambientTerm.r + diffuseTerm) + specularTerm,
       this.albedo.g * pointLight.intensity * pointLight.color.g * (ambientTerm.g + diffuseTerm) + specularTerm,
       this.albedo.b * pointLight.intensity * pointLight.color.b * (ambientTerm.b + diffuseTerm) + specularTerm
    );


    const color = new Color(
      this.albedo.r * diffuseTerm,
      this.albedo.g * diffuseTerm,
      this.albedo.b * diffuseTerm
    );

    color.g += specularTerm * pointLight.color.g * pointLight.intensity;
    color.r += specularTerm * pointLight.color.r * pointLight.intensity;
    color.b += specularTerm * pointLight.color.b * pointLight.intensity;

    return color;
  }
};
PhongMaterial.prototype = Object.create(LambertMaterial.prototype);
PhongMaterial.prototype.constructor = PhongMaterial;

module.exports = PhongMaterial;
