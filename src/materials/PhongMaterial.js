var logger = require('../utils/Logger.js');

var LambertMaterial = require('./LambertMaterial.js');
var VectorUtils = require('../math/VectorUtils.js');
var Ray = require('../sceneObjects/Ray.js');
var Vector = require('../math/Vector.js');
var Color = require('../Color.js');


var PhongMaterial = function(params) {
  LambertMaterial.call(this, params);

  params = params || {};
  this.shininess = params.shininess || 1;
  this.reflection = Math.min(1, Math.max(0, params.reflection || 0.5)); // [0, 1]
};

PhongMaterial.prototype = new LambertMaterial();
PhongMaterial.prototype.constructor = PhongMaterial;

PhongMaterial.prototype.getColorForIntersection = function(intersection, scene, reflectionRecursionCounter) {
  var pointLight = scene.lights[0];

  // view vector
  var V = scene.camera.position.clone().subV(intersection.point).normalize();

  // light vector
  var L = pointLight.position.clone().subV(intersection.point);
  L.multiplyScalar(-1)

  // reflected light vecotr
  var R = VectorUtils.reflect(L, intersection.normal).normalize();

  // Ip * ks * (V * R)^n
  var ks = 1;
  var specularTerm = ks * Math.pow(Math.max(0, V.dot(R)), this.shininess);

  // Ia + Id + Is => Ia + Ip · [kd(N · L) + ks(V · R)^n]
  localColor = LambertMaterial.prototype.getColorForIntersection.call(this, intersection, scene, reflectionRecursionCounter);
  localColor.addScalar(specularTerm);

  if (this.reflection === 0) {
    return localColor;
  }

  var reflectedPrimaryRay = this.getReflectedRay(intersection);
  var reflectedColor = this.getReflectiveColor(reflectedPrimaryRay, scene, reflectionRecursionCounter);

  localColor.multiplyScalar(1 - this.reflection);
  reflectedColor.multiplyScalar(this.reflection);

  return localColor.add(reflectedColor);
}

PhongMaterial.prototype.getReflectedRay = function(intersection) {
  var R = new Ray();

  R.position.setV(intersection.point);

  var reflectedVector = VectorUtils.reflect(intersection.ray.direction, intersection.normal).normalize();
  R.direction.setV(reflectedVector);

  return R;
}

PhongMaterial.prototype.getReflectiveColor = function(reflectedRay, scene, reflectionRecursionCounter) {
  return scene.traceRay(reflectedRay, ++reflectionRecursionCounter);
}

module.exports = PhongMaterial;
