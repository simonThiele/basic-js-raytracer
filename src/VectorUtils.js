var Vector = require('./Vector.js');

module.exports = {
  add: function(v1, v2) {
    var vector = new Vector(v1.x, v1.y, v1.z);
    vector.add(v2.x, v2.y, v2.z);

    return vector;
  },

  sub: function(v1, v2) {
    var vector = new Vector(v1.x, v1.y, v1.z);
    vector.sub(v2.x, v2.y, v2.z);

    return vector;
  }
};