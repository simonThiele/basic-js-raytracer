'use strict';

var Raytracer = require('./Raytracer.js');

var canvas = document.getElementById('mainScene');
canvas.width = 600;
canvas.height = 400;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;


var raytracer = new Raytracer(canvas);

raytracer.start();
