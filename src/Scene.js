var AmbientLight = require('./sceneObjects/lights/AmbientLight.js');
var PointLight = require('./sceneObjects/lights/PointLight.js');
var PhongMaterial = require('./materials/PhongMaterial.js');
var Sphere = require('./sceneObjects/geometry/Sphere.js');
var Plane = require('./sceneObjects/geometry/Plane.js');
var Camera = require('./sceneObjects/Camera.js');
var Vector = require('./math/Vector.js');
var Color = require('./Color.js');


module.exports = function Scene() {
  this.sceneObjects = [];
  this.ambientLights = [];
  this.lights = [];


  this.addSceneObject = function(object) {
    if (object instanceof AmbientLight) {
      this.ambientLights.push(object);
    } else if (object instanceof PointLight) {
      this.lights.push(object);
    } else {
      this.sceneObjects.push(object);
    }
  }

  this.traceRay = function(ray) {
    for (var i = 0; i < this.sceneObjects.length; i++) {
      var sceneObject = this.sceneObjects[i];
      var intersection = sceneObject.intersectsRay(ray);
      if (intersection) {
        // the basic pixel color at this point
        const color = sceneObject.material.getColorForIntersection(intersection, this);

        return color;
      }
    }

    return new Color(Math.random(), Math.random(), Math.random());
  }

  this.loadDefault = function(width, height) {
    this.camera = new Camera(45, width / height);
    this.camera.position.set(0, 0, 0);
    this.camera.direction.set(0, 0, -1);
    this.camera.direction.normalize();

    var sphere = new Sphere({ radius: 1 });
    sphere.position.set(-1, 0, -3);
    this.addSceneObject(sphere);

    var sphere2 = new Sphere({ radius: 1, material: new PhongMaterial({ shininess: 10 }) });
    sphere2.position.set(1, 0, -3);
    this.addSceneObject(sphere2);

    var plane = new Plane({ distance: 2 });
    plane.position.set(0, -1, -3);
    this.addSceneObject(plane);

    var ambientLight = new AmbientLight({ color: new Color(0.1, 0.1, 0.1) });
    this.addSceneObject(ambientLight);

    var pointLight1 = new PointLight({
      color: new Color(1, 1, 1),
      radius: 2.5,
      intensity: 0.8,
      position: new Vector(3, 3, -1)
    });
    this.addSceneObject(pointLight1);
  }
}
