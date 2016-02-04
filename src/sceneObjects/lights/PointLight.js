var Vector = require('../../math/Vector.js');
var BasicLight = require('./BasicLight.js');


var PointLight = function(params) {
  BasicLight.call(this, params);

  params = params || {};
  this.distance = params.distance || 10;
  this.intensity = params.intensity || 1;
  this.position = params.position || new Vector();
};
PointLight.prototype = Object.create(BasicLight.prototype);
PointLight.prototype.constructor = PointLight;

module.exports = PointLight;
