var Color = require('../../Color.js');


var BasicLight = function(params) {
  params = params || {};
  this.color = params.color || new Color(1, 1, 1);
};
BasicLight.prototype.constructor = BasicLight;

module.exports = BasicLight;
