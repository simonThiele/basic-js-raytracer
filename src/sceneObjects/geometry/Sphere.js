var logger = require('../../utils/Logger.js');

var BasicMaterial = require('../../materials/LambertMaterial.js');
var VectorUtils = require('../../math/VectorUtils.js');
var Intersection = require('../../Intersection.js');
var SceneObject = require('../SceneObject.js');


var Sphere = function(params) {
  SceneObject.call(this);

  params = params || {};
  this.radius = params.radius;
  this.material = params.material || new BasicMaterial();


  // see www.ccs.neu.edu/home/fell/CSU540/programs/RayTracingFormulas.htm
  this.intersectsRay = function(ray) {
    var r = this.radius;
    var x0 = ray.position.x;
    var y0 = ray.position.y;
    var z0 = ray.position.z;
    var dx = ray.direction.x;
    var dy = ray.direction.y;
    var dz = ray.direction.z;
    var cx = this.position.x;
    var cy = this.position.y;
    var cz = this.position.z;

    var A = dx * dx + dy * dy + dz * dz;
    var B = 2 * dx * (x0 - cx) + 2 * dy * (y0 - cy) +  2 * dz * (z0 - cz);
    var C = cx * cx + cy * cy + cz * cz + x0 * x0 + y0 * y0 + z0 * z0 + -2 * (cx * x0 + cy * y0 + cz * z0) - r * r;

    // discriminant
    var d = B * B - 4 * C;

    if (d < 0) {
      // no real solution
      return false;

    } else if (d >= 0) {
      // two real solutions
      // d === 0 -> tangents
      // t0: (-B - Math.sqrt(B * B - 4 * C)) / 2,
      // t1: (-B + Math.sqrt(B * B - 4 * C)) / 2
      var t = (-B - Math.sqrt(B * B - 4 * A * C)) / (2 * A);

      // if t < 0 : the sphere was hitten behind the ray
      if (t <= 0) {
        return false;
      }
      var pointOfIntersection = VectorUtils.add(ray.position, ray.direction.clone().multiplyScalar(t));
      var normal = VectorUtils.sub(pointOfIntersection, this.position).normalize();

      return new Intersection({
        point: pointOfIntersection,
        normal: normal,
        distance: t,
        ray: ray
      });
    }
  }
};
Sphere.prototype = new SceneObject();
Sphere.prototype.constructor = Sphere;

module.exports = Sphere;
