var Vector = require('../math/Vector.js');


var SceneObject = function() {
  this.position = new Vector();
};

SceneObject.prototype.constructor = SceneObject;

module.exports = SceneObject;
