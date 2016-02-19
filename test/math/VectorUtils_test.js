var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

var VectorUtils = require('../../src/math/VectorUtils.js');
var Vector = require('../../src/math/Vector.js');


describe('VectorUtils', function() {
  it('add two vectors', function () {
    var vectorA = new Vector(1, 2, 3);
    var vectorB = new Vector(4, 5, 6);

    var result = VectorUtils.add(vectorA, vectorB);

    expect(result.x).to.equal(5);
    expect(result.y).to.equal(7);
    expect(result.z).to.equal(9);
  });

  describe('refract', function () {
    it('should calculate the same vector if eta is 1', function () {
      checkXYZ(VectorUtils.refract(
        new Vector(1, -1, 0), // incident
        new Vector(0, 1, 0), // normal
        1), 1, -1, 0); // transmitted
    });

    it('should calculate the break if eta is 0.5', function () {
      checkXYZ(VectorUtils.refract(
        new Vector(1, -1, 0), // incident
        new Vector(0, 1, 0), // normal
        0.5), 0.5, -1, 0); // transmitted
    });

    it('should calculate the break if eta is 2', function () {
      checkXYZ(VectorUtils.refract(
        new Vector(1, -1, 0), // incident
        new Vector(0, 1, 0), // normal
        2), 2, -1, 0); // transmitted
    });
  });

  function checkXYZ(vector, expectedX, expectedY, expectedZ) {
    expect(vector.x).to.equal(expectedX);
    expect(vector.y).to.equal(expectedY);
    expect(vector.z).to.equal(expectedZ);
  }
});
