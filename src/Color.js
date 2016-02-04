module.exports = function Vector(r, g, b) {
  this.r = r || 0;
  this.g = g || 0;
  this.b = b || 0;


  this.add = function(color2) {
    this.r += Math.min(1, color2.r);
    this.g += Math.min(1, color2.g);
    this.b += Math.min(1, color2.b);
  }
}
