var Sphere = require('./sceneObjects/geometry/Sphere.js');
var Camera = require('./sceneObjects/Camera.js');
var Color = require('./Color.js');


module.exports = function Scene() {
  this.sceneObjects = [];

  this.loadDefault = function(width, height) {
    this.camera = new Camera(30, width / height);
    this.camera.position.set(0, 0, 0);
    this.camera.direction.set(0, 0, -1);
    this.camera.direction.normalize();

    var sphere = new Sphere(1);
    sphere.position.set(0, 0, -2);
    this.addSceneObject(sphere);
  }

  this.addSceneObject = function(object) {
    this.sceneObjects.push(object);
  }

  this.traceRay = function(ray) {

    for (var i = 0; i < this.sceneObjects.length; i++) {
      var sceneObject = this.sceneObjects[i];
      if (sceneObject.intersectsRay(ray)) {
        return new Color(255, 0, 0);
      }
    }

    return new Color(
      Math.random() * 256 | 0,
      Math.random() * 256 | 0,
      Math.random() * 256 | 0
    );
  }
}
