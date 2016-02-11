var SceneObject = require('./SceneObject.js');
var Vector = require('../math/Vector.js');


var Ray = function() {
  SceneObject.call(this);
  this.direction = new Vector();
};

Ray.prototype = new SceneObject();
Ray.prototype.constructor = Ray;

module.exports = Ray;
