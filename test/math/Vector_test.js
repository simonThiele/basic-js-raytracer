var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

var Vector = require('../../src/math/Vector.js');


describe('Vector', function() {
  it('should have 0 0 0 as default values', function () {
    var vector = new Vector();
    checkXYZ(vector, 0, 0, 0);

    vector = new Vector(1);
    checkXYZ(vector, 1, 0, 0);

    vector = new Vector(1, -2, 12);
    checkXYZ(vector, 1, -2, 12);
  });

  it('should add', function () {
    var vector = new Vector();
    checkXYZ(vector, 0, 0, 0);

    vector.add(1, 2, -5);
    checkXYZ(vector, 1, 2, -5);

    vector.add(-3, 5, 0);
    checkXYZ(vector, -2, 7, -5);
  });

  it('should sub', function () {
    var vector = new Vector();
    checkXYZ(vector, 0, 0, 0);

    vector.sub(1, 2, -5);
    checkXYZ(vector, -1, -2, 5);

    vector.sub(-3, 5, 0);
    checkXYZ(vector, 2, -7, 5);
  });

  it('should have length', function () {
    var vector = new Vector();
    expect(vector.length()).to.equal(0);

    vector = new Vector(0, 10, 10);
    expect(vector.length()).to.equal(Math.sqrt(200));
  });

  it('should have length = 1 after normalization', function () {
    var vector = new Vector(-213.4325, 0, 32842398432);
    vector.normalize();
    expect(vector.length()).to.equal(1);
  });

  it('can be multiplied with a scalar', function () {
    var vector = new Vector(10, -2 ,0);
    vector.multiplyScalar(10);
    checkXYZ(vector, 100, -20, 0);
  });

  it('can be cloned', function () {
    var vector = new Vector(10, -2 ,0);
    var vectorClone = vector.clone();

    vector.set(1, 2, 3);
    checkXYZ(vector, 1, 2, 3);
    checkXYZ(vectorClone, 10, -2,0 );
  });

  function checkXYZ(vector, expectedX, expectedY, expectedZ) {
    expect(vector.x).to.equal(expectedX);
    expect(vector.y).to.equal(expectedY);
    expect(vector.z).to.equal(expectedZ);
  }
});
