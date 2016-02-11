var Color = function(r, g, b) {
  this.r = r || 0;
  this.g = g || 0;
  this.b = b || 0;
};

Color.prototype.add = function(color2) {
  this.r = Math.min(1, this.r + color2.r);
  this.g = Math.min(1, this.g + color2.g);
  this.b = Math.min(1, this.b + color2.b);

  return this;
};

Color.prototype.addScalar = function(scalar) {
  this.r = Math.min(1, this.r + scalar);
  this.g = Math.min(1, this.g + scalar);
  this.b = Math.min(1, this.b + scalar);

  return this;
};

Color.prototype.multiplyScalar = function(scalar) {
  this.r = Math.min(1, this.r * scalar);
  this.g = Math.min(1, this.g * scalar);
  this.b = Math.min(1, this.b * scalar);

  return this;
};

Color.prototype.clone = function() {
  return new Color(this.r, this.g, this.b);
};

module.exports = Color;
