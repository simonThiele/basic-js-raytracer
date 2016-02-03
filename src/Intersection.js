var Vector = require('./math/Vector.js');


var Intersection = function(params) {
  this.ray = params.ray;
  this.point = params.point;
  this.normal = params.normal;
  this.distance = params.distance;
};
Intersection.prototype.constructor = Intersection;

module.exports = Intersection;
