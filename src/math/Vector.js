var Vector = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
};

Vector.prototype.set = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
};

Vector.prototype.setV = function(vector) {
  this.set(vector.x, vector.y, vector.z);
};

Vector.prototype.add = function(x, y, z) {
  this.x += x;
  this.y += y;
  this.z += z;

  return this;
};

Vector.prototype.sub = function(x, y, z) {
  return this.add(-x, -y, -z);
};

Vector.prototype.subV = function(vector) {
  return this.add(-vector.x, -vector.y, -vector.z);
};

Vector.prototype.addV = function(vector) {
  return this.add(vector.x, vector.y, vector.z);
};

Vector.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector.prototype.normalize = function() {
  var length = this.length();
  this.x /= length;
  this.y /= length;
  this.z /= length;

  return this;
};

Vector.prototype.multiplyScalar = function(scalar) {
  this.x *= scalar;
  this.y *= scalar;
  this.z *= scalar;

  return this;
};

Vector.prototype.dot = function(vector) {
  return this.x * vector.x + this.y * vector.y + this.z * vector.z;
};

Vector.prototype.clone = function() {
  return new Vector(
    this.x,
    this.y,
    this.z
  );
};

module.exports = Vector;
