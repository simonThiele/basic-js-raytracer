module.exports = function Vector(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;

  this.set = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  this.setV = function(vector) {
    this.set(vector.x, vector.y, vector.z);
  }

  this.add = function(x, y, z) {
    this.x += x;
    this.y += y;
    this.z += z;
  }

  this.sub = function(x, y, z) {
    this.add(-x, -y, -z);
  }

  this.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  this.normalize = function() {
    var length = this.length();
    this.x /= length;
    this.y /= length;
    this.z /= length;
  }

  this.multiplyScalar = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }

  this.dot = function(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }
}