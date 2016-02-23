var AmbientLight = require('../sceneObjects/lights/AmbientLight.js');
var PointLight = require('../sceneObjects/lights/PointLight.js');
var Ray = require('../sceneObjects/Ray.js');
var Vector = require('../math/Vector.js');
var Color = require('../Color.js');


var maxReflectionRecursiveCounter = 2;
var maxRefractionRecursiveCounter = 0;
var black = new Color(0, 0, 0);

var Scene = function() {
  this.sceneObjects = [];
  this.ambientTerm = new Color(0, 0, 0);
  this.lights = [];
};

Scene.prototype.constructor = Scene;

Scene.prototype.addSceneObject = function(object) {
  if (object instanceof AmbientLight) {
    this.ambientTerm.add(object.color);
  } else if (object instanceof PointLight) {
    this.lights.push(object);
  } else {
    this.sceneObjects.push(object);
  }
};

Scene.prototype.traceRay = function(ray, reflectionRecursionCounter) {
  // if the max limit is reached, return black
  if (reflectionRecursionCounter > maxReflectionRecursiveCounter) {
    return black;
  }

  var closest = this.getClosestIntersection(ray);
  if (!closest) {
    return black;
  }

  var numLightsNotVisible = 0;
  var numLights = this.lights.length;
  for (var i = 0; i < numLights; i++) {
    var light = this.lights[i];
    // check if the light is visible from intersection PointLight
    if (this.getClosestIntersection(this.getLightRay(light, closest.intersection.point))) {
      numLightsNotVisible++;
    }
  }

  // if all lights are not visible -> return black
  if (numLightsNotVisible === numLights) {
    return black;
  }

  // if yes -> get color at that pixel
  const pixelColor = closest.sceneObject.material.getColorForIntersection(closest.intersection, this, reflectionRecursionCounter);
  var shadowColor = black.clone();

  // if 5 of 7 lights are visible, the pixelColor get a weight by 5/7 and the shadow by 2/7
  pixelColor.multiplyScalar((numLights - numLightsNotVisible) / numLights);
  shadowColor.multiplyScalar(numLightsNotVisible / numLights);

  var finalColor = pixelColor.add(shadowColor);

  // Ia + ...
  finalColor.add(this.ambientTerm);
  return finalColor;
};

Scene.prototype.getLightRay = function(light, position) {
  // light vector
  var LRay = new Ray();
  var L = light.position.clone().subV(position);

  LRay.position.setV(position);
  LRay.direction.setV(L);
  LRay.direction.normalize();
  LRay.position.addV(LRay.direction.clone().multiplyScalar(0.001));

  return LRay;
}

Scene.prototype.getClosestIntersection = function(ray) {
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
    return undefined;
  }

  return intersections.sort(function(a, b) { return a.intersection.distance > b.intersection.distance; })[0];
};

module.exports = Scene;
