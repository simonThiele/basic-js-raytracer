var BasicMaterial = require('../../materials/LambertMaterial.js');
var VectorUtils = require('../../math/VectorUtils.js');
var Intersection = require('../../Intersection.js');
var SceneObject = require('../SceneObject.js');
var Vector = require('../../math/Vector.js');


var Plane = function(params) {
  SceneObject.call(this);

  params = params || {};
  this.normal = params.normal || new Vector(0, 1, 0);
  this.distance = params.distance;
  this.material = params.material || new BasicMaterial();


  // see www.ccs.neu.edu/home/fell/CSU540/programs/RayTracingFormulas.htm
  this.intersectsRay = function(ray) {
    const dot = this.normal.dot(ray.direction);

    if (dot >= 0) {
      return false;
    }

    var t = -(ray.position.dot(this.normal) + this.distance) / dot;
    var pointOfIntersection = VectorUtils.add(ray.position, ray.direction.clone().multiplyScalar(t));

    return new Intersection({
      point: pointOfIntersection,
      normal: this.normal,
      distance: t,
      ray: ray
    });
  }
};
Plane.prototype = Object.create(SceneObject.prototype);
Plane.prototype.constructor = Plane;

module.exports = Plane;
