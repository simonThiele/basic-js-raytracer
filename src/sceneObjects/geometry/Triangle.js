var BasicMaterial = require('../../materials/BasicMaterial.js');
var VectorUtils = require('../../math/VectorUtils.js');
var Intersection = require('../../Intersection.js');
var SceneObject = require('../SceneObject.js');
var Vector = require('../../math/Vector.js');


var Triangle = function(params) {
  SceneObject.call(this);

  params = params || {};
  this.points = params.points;
  this.material = params.material || new BasicMaterial();
};

Triangle.prototype = new SceneObject();
Triangle.prototype.constructor = Triangle;

// http://www.cs.virginia.edu/~gfx/Courses/2003/ImageSynthesis/papers/Acceleration/Fast%20MinimumStorage%20RayTriangle%20Intersection.pdf
Triangle.prototype.intersectsRay = function(ray) {
  var p = this.points;
  var p1x = p[0]; var p1y = p[1]; var p1z = p[2];
  var p2x = p[3]; var p2y = p[4]; var p2z = p[5];
  var p3x = p[6]; var p3y = p[7]; var p3z = p[8];

  var e1 = new Vector(p2x - p1x, p2y - p1y, p2z - p1z);
  var e2 = new Vector(p3x - p1x, p3y - p1y, p3z - p1z);
  var h = VectorUtils.cross(ray.direction, e2);
  var a = e1.dot(h);

  if (a > -0.00001 && a < 0.00001) {
    return false;
  }

  var f = 1.0 / a;
  var s = new Vector(ray.position.x - p1x, ray.position.y - p1y, ray.position.z - p1z);
  var u = f * s.dot(h);

  if (u < 0.0 || u > 1.0) {
    return false;
  }

  var q = VectorUtils.cross(s, e1);
  var v = f * q.dot(ray.direction);

  if (v < 0.0 || u + v > 1.0) {
    return false;
  }

  // at this stage we can compute t to find out where
  // the intersection point is on the line
  var t = f * e2.dot(q);

  if (t > 0.00001) { // ray intersection
    return new Intersection({
      point: new Vector(
        ray.position.x + t * ray.direction.x,
        ray.position.y + t * ray.direction.y,
        ray.position.z + t * ray.direction.z
      ),
      normal: VectorUtils.cross(e1, e2).multiplyScalar(1),
      distance: t,
      ray: ray
    });
  }

  // this means that there is a line intersection
  // but not a ray intersection
  return false;
};

module.exports = Triangle;
