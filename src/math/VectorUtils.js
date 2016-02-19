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
  },

  // nvidia reference implementation: http://http.developer.nvidia.com/Cg/refract.html
  refract: function(i, n, eta) {
    var cosi = i.clone().multiplyScalar(-1).dot(n);
    var cost2 = 1.0 - eta * eta * (1.0 - cosi * cosi);
    var t = i.clone().multiplyScalar(eta).addV(n.multiplyScalar(eta * cosi - Math.sqrt(Math.abs(cost2))));

    if (cost2 > 0) {
      return t;
    }
    return t.multiplyScalar(0);
  },

  cross(a, b) {
    return new Vector(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }
};
