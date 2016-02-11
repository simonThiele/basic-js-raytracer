var BasicLight = require('./BasicLight.js');


var AmbientLight = function(params) {
  BasicLight.call(this, params);
};
AmbientLight.prototype = new BasicLight();
AmbientLight.prototype.constructor = AmbientLight;

module.exports = AmbientLight;
