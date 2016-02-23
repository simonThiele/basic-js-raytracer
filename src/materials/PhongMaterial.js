var logger = require('../utils/Logger.js');

var LambertMaterial = require('./LambertMaterial.js');
var VectorUtils = require('../math/VectorUtils.js');
var Ray = require('../sceneObjects/Ray.js');
var Vector = require('../math/Vector.js');
var Color = require('../Color.js');


var black = new Color(0, 0, 0);

var PhongMaterial = function(params) {
  LambertMaterial.call(this, params);

  params = params || {};
  this.shininess = params.shininess || 1;
  this.reflection = Math.min(1, Math.max(0, params.reflection || 0.5)); // [0, 1]
  this.refraction = Math.min(1, Math.max(0, params.refraction || 0)); // [0, 1]
};

PhongMaterial.prototype = new LambertMaterial();
PhongMaterial.prototype.constructor = PhongMaterial;

PhongMaterial.prototype.getColorForIntersection = function(intersection,
                                                           scene,
                                                           reflectionRecursionCounter) {
  var numLights = scene.lights.length;
  var allSpec = 0;
  var r = 0;
  var g = 0;
  var b = 0;
  for (var i = 0; i < numLights; i++) {
    var pointLight = scene.lights[i];

    // view vector
    var V = scene.camera.position.clone().subV(intersection.point).normalize();

    // light vector
    var L = pointLight.position.clone().subV(intersection.point);
    L.multiplyScalar(-1)

    // reflected light vecotr
    var R = VectorUtils.reflect(L, intersection.normal).normalize();

    // Ip * ks * (V * R)^n
    var ks = 1;
    allSpec += ks * Math.pow(Math.max(0, V.dot(R)), this.shininess);

    // Ia + Id + Is => Ia + Ip · [kd(N · L) + ks(V · R)^n]
    var diffuseTerm = this.getDiffuseTerm(intersection, pointLight);

    // light intensity
    var Id = pointLight.getIntensityAtPoint(intersection.point);

    // Ia + Id
    var localColor = new Color(
      this.albedo.r * Id * pointLight.color.r * diffuseTerm,
      this.albedo.g * Id * pointLight.color.g * diffuseTerm,
      this.albedo.b * Id * pointLight.color.b * diffuseTerm
    );

    if (this.reflection > 0) {
      var reflectedPrimaryRay = this.getReflectedRay(intersection);
      var reflectedColor = this.getReflectiveColor(reflectedPrimaryRay, scene, reflectionRecursionCounter);
      localColor.multiplyScalar(1 - this.reflection);
      reflectedColor.multiplyScalar(this.reflection);
      localColor.add(reflectedColor);
    }

    if (this.refraction > 0) {
      var refractionPrimaryRay = this.getRefractionRay(intersection);
      var refractedColor = this.getRefractiveColor(refractionPrimaryRay, scene, reflectionRecursionCounter);
      refractedColor.multiplyScalar(this.refraction);

      localColor.multiplyScalar(1 - this.refraction);
      localColor.add(refractedColor);
    }

    r += localColor.r;
    g += localColor.g;
    b += localColor.b;
  }

  var color = new Color(r, g, b).multiplyScalar(1 / numLights);
  color.r += allSpec;
  color.g += allSpec;
  color.b += allSpec;
  return color;
};

PhongMaterial.prototype.getReflectedRay = function(intersection) {
  var R = new Ray();

  R.position.setV(intersection.point);

  var reflectedVector = VectorUtils.reflect(intersection.ray.direction, intersection.normal).normalize();
  R.direction.setV(reflectedVector);

  return R;
};

PhongMaterial.prototype.getRefractionRay = function(intersection) {
  var R = new Ray();

  R.position.setV(intersection.point);

  var reflectedVector = VectorUtils.refract(intersection.ray.direction, intersection.normal, 0.5).normalize();
  R.direction.setV(reflectedVector);

  R.position.addV(R.direction.clone().multiplyScalar(0.001));

  return R;
};

PhongMaterial.prototype.getReflectiveColor = function(reflectedRay, scene, reflectionRecursionCounter) {
  return scene.traceRay(reflectedRay, ++reflectionRecursionCounter);
};

PhongMaterial.prototype.getRefractiveColor = function(reflectedRay, scene, reflectionRecursionCounter) {
  return new Color(0, 0, 0);
};

module.exports = PhongMaterial;
