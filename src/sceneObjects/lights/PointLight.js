var VectorUtils = require('../../math/VectorUtils.js');
var Vector = require('../../math/Vector.js');
var BasicLight = require('./BasicLight.js');


var PointLight = function(params) {
  BasicLight.call(this, params);

  params = params || {};
  this.radius = params.radius || 10;
  this.intensity = params.intensity || 1;
  this.position = params.position || new Vector();

  // https://imdoingitwrong.wordpress.com/2011/01/31/light-attenuation/
  this.getIntensityAtPoint = function(point) {
    var radius = this.radius;
    var distanceToLight = VectorUtils.sub(this.position, point).length();

    // calculate basic attenuation
    var denom = Math.max(distanceToLight - radius, 0) / radius + 1;
    var attenuation = 1 / (denom * denom);

    // now without cutoff

    return attenuation;
  }
};
PointLight.prototype = new BasicLight();
PointLight.prototype.constructor = PointLight;

module.exports = PointLight;
