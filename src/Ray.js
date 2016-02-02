var SceneObject = require('./SceneObject.js');
var Vector = require('./Vector.js');

var Ray = function() {
  SceneObject.call(this);
  this.direction = new Vector();
}

Ray.prototype = Object.create(SceneObject.prototype);
Ray.prototype.constructor = Ray;

module.exports = Ray;
