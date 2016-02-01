'use strict';

var Raytracer = require('./Raytracer.js');

var canvas = document.getElementById('mainScene');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var raytracer = new Raytracer(canvas);

raytracer.start();
