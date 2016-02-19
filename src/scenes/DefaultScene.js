var AmbientLight = require('../sceneObjects/lights/AmbientLight.js');
var PointLight = require('../sceneObjects/lights/PointLight.js');
var LambertMaterial = require('../materials/LambertMaterial.js');
var Triangle = require('../sceneObjects/geometry/Triangle.js');
var PhongMaterial = require('../materials/PhongMaterial.js');
var Sphere = require('../sceneObjects/geometry/Sphere.js');
var Plane = require('../sceneObjects/geometry/Plane.js');
var Camera = require('../sceneObjects/Camera.js');
var Vector = require('../math/Vector.js');
var Color = require('../Color.js');
var Scene = require('./Scene.js');


var DefaultScene = function(fov, aspect) {
  Scene.call(this);
};

DefaultScene.prototype = new Scene();
DefaultScene.prototype.constructor = DefaultScene;

DefaultScene.prototype.load = function(width, height) {
  this.camera = new Camera(45, width / height);
  this.camera.position.set(0, 0, 0);
  this.camera.direction.set(0, 0, -1);
  this.camera.direction.normalize();

  var sphere = new Sphere({
    radius: 1,
    material: new PhongMaterial({
      shininess: 15,
      reflection: 0.4,
      color: new Color(1, 1, 1)
    })
  });
  sphere.position.set(-1, 0, -3);
  this.addSceneObject(sphere);

  var sphere2 = new Sphere({
    radius: 1,
    material: new PhongMaterial({
      shininess: 15,
      reflection: 0.1,
      color: new Color(1, 1, 1)
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

  this.addSceneObject(new Triangle({
    points: [-2.5, -1, -2, -2.5, -1, -6, -2.5, 3, -6],
    material: new LambertMaterial({
      color: new Color(1, 0, 0)
    })
  }));

  this.addSceneObject(new Triangle({
    points: [-2.5, -1, -2, -2.5, 3, -6, -2.5, 3, -2],
    material: new LambertMaterial({
      color: new Color(1, 0, 0)
    })
  }));

  this.addSceneObject(new Triangle({
    points: [2.5, -1, -6, 2.5, -1, -2, 2.5, 3, -2],
    material: new LambertMaterial({
      color: new Color(0, 1, 0)
    })
  }));

  this.addSceneObject(new Triangle({
    points: [2.5, -1, -6, 2.5, 3, -2, 2.5, 3, -6],
    material: new LambertMaterial({
      color: new Color(0, 1, 0)
    })
  }));

  this.addSceneObject(new Triangle({
    points: [-2.5, -1, -6, 2.5, -1, -6, 2.5, 3, -6],
    material: new LambertMaterial({
      color: new Color(1, 1, 1)
    })
  }));

  this.addSceneObject(new Triangle({
    points: [-2.5, -1, -6, 2.5, 3, -6, -2.5, 3, -6],
    material: new LambertMaterial({
      color: new Color(1, 1, 1)
    })
  }));

  var ambientLight = new AmbientLight({ color: new Color(0.03, 0.03, 0.03) });
  this.addSceneObject(ambientLight);

  var pointLight1 = new PointLight({
    color: new Color(1, 1, 1),
    radius: 2.5,
    intensity: 0.8,
    position: new Vector(2, 3, -1)
  });
  this.addSceneObject(pointLight1);

  var pointLight2 = new PointLight({
    color: new Color(1, 1, 1),
    radius: 4,
    intensity: 1,
    position: new Vector(-1, 3, -2)
  });
  this.addSceneObject(pointLight2);
};

module.exports = DefaultScene;
