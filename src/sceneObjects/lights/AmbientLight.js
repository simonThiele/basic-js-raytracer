var BasicLight = require('./BasicLight.js');


var AmbientLight = function(params) {
  BasicLight.call(this, params);
};
AmbientLight.prototype = Object.create(BasicLight.prototype);
AmbientLight.prototype.constructor = AmbientLight;

module.exports = AmbientLight;
