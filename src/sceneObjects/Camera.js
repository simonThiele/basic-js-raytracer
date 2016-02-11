var SceneObject = require('./SceneObject.js');
var Vector = require('../math/Vector.js');


var Camera = function(fov, aspect) {
  SceneObject.call(this);

  this.fov = fov;
  this.aspect = aspect;
  this.direction = new Vector();

  this.viewPlaneHeight = 2 * Math.tan(this.fov / 2);
  this.viewPlaneWidth = this.viewPlaneHeight * this.aspect;
};
Camera.prototype = new SceneObject();
Camera.prototype.constructor = Camera;

module.exports = Camera;
