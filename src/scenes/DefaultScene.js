var AmbientLight = require('../sceneObjects/lights/AmbientLight.js');
var PointLight = require('../sceneObjects/lights/PointLight.js');
var LambertMaterial = require('../materials/LambertMaterial.js');
var PhongMaterial = require('../materials/PhongMaterial.js');
var Sphere = require('../sceneObjects/geometry/Sphere.js');
var Plane = require('../sceneObjects/geometry/Plane.js');
var Camera = require('../sceneObjects/Camera.js');
var Vector = require('../math/Vector.js');
var Color = require('../Color.js');
var Scene = require('./Scene.js');


var DefaultScene = function(fov, aspect) {
  Scene.call(this);


  this.load = function(width, height) {
    this.camera = new Camera(45, width / height);
    this.camera.position.set(0, 0, 0);
    this.camera.direction.set(0, 0, -1);
    this.camera.direction.normalize();

    var sphere = new Sphere({
      radius: 1,
      material: new LambertMaterial({
        color: new Color(0, 1, 0)
      })
    });
    sphere.position.set(-1, 0, -3);
    this.addSceneObject(sphere);

    var sphere2 = new Sphere({
      radius: 1,
      material: new PhongMaterial({
        shininess: 15,
        color: new Color(1, 0, 0)
      })
    });
    sphere2.position.set(1, 0, -3);
    this.addSceneObject(sphere2);

    var plane = new Plane({
      distance: 1,
      material: new LambertMaterial({
        color: new Color(0, 0, 1)
      })
    });
    plane.position.set(0, 0, -3);
    this.addSceneObject(plane);

    var ambientLight = new AmbientLight({ color: new Color(0.03, 0.03, 0.03) });
    this.addSceneObject(ambientLight);

    var pointLight1 = new PointLight({
      color: new Color(1, 1, 1),
      radius: 2.5,
      intensity: 0.8,
      position: new Vector(3, 3, -1)
    });
    this.addSceneObject(pointLight1);
  }
};
DefaultScene.prototype = Object.create(Scene.prototype);
DefaultScene.prototype.constructor = DefaultScene;

module.exports = DefaultScene;
