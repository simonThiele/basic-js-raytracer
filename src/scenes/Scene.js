var AmbientLight = require('../sceneObjects/lights/AmbientLight.js');
var PointLight = require('../sceneObjects/lights/PointLight.js');
var Vector = require('../math/Vector.js');
var Color = require('../Color.js');


var maxReflectionRecursiveCounter = 1;
var black = new Color(0, 0, 0);

var Scene = function() {
  this.sceneObjects = [];
  this.ambientTerm = new Color(0, 0, 0);
  this.lights = [];


  this.addSceneObject = function(object) {
    if (object instanceof AmbientLight) {
      this.ambientTerm.add(object.color);
    } else if (object instanceof PointLight) {
      this.lights.push(object);
    } else {
      this.sceneObjects.push(object);
    }
  }

  this.traceRay = function(ray, reflectionRecursionCounter) {
    // if the max limit is reached, return black
    if (reflectionRecursionCounter > maxReflectionRecursiveCounter) {
      return black;
    }

    var intersections = [];
    for (var i = 0; i < this.sceneObjects.length; i++) {
      var sceneObject = this.sceneObjects[i];
      var intersection = sceneObject.intersectsRay(ray);
      if (intersection) {
        intersections.push({
          intersection: intersection,
          sceneObject: sceneObject
        });
      }
    }

    if (intersections.length === 0) {
      return black;
    }

    var closest = intersections.sort(function(a, b) { return a.distance > b.distance; })[0];
    const pixelColor = closest.sceneObject.material.getColorForIntersection(closest.intersection, this, reflectionRecursionCounter);

    // Ia + ...
    pixelColor.add(this.ambientTerm);
    return pixelColor;
  }
}

Scene.prototype.constructor = Scene;

module.exports = Scene;
