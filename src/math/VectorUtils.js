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
  },

  // nvidia reference implementation: http://http.developer.nvidia.com/Cg/reflect.html
  reflect: function(i, n) {
    // i - 2.0 * n * dot(n,i);
    return this.sub(i, n.clone().multiplyScalar(2 * n.dot(i)));
  }
};
