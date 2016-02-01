/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Raytracer = __webpack_require__(1);

	var canvas = document.getElementById('mainScene');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var raytracer = new Raytracer(canvas);

	raytracer.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var canvasUtils = __webpack_require__(2);

	module.exports = function Raytracer(canvas) {
	  this.canvas = canvas;

	  this.start = function() {
	    var canvas = this.canvas;
	    var width = canvas.width;
	    var height = canvas.height;
	    var image = canvasUtils.getImageFromCanvas(canvas);

	    for (var x = 0; x < width; x++) {
	      for (var y = 0; y < height; y++) {
	        canvasUtils.setPixel(image, x, y,
	          Math.random() * 256 | 0, // r
	          Math.random() * 256 | 0, // g
	          Math.random() * 256 | 0, // b
	          256                      // a
	        );
	      }
	    }

	    canvasUtils.imageToCanvas(image, canvas);
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  getImageFromCanvas: function(canvas) {
	    var context = canvas.getContext('2d');
	    return context.createImageData(canvas.width, canvas.height);
	  },

	  imageToCanvas: function(imageData, canvas) {
	    var context = canvas.getContext('2d');
	    context.putImageData(imageData, 0, 0); // at coords 0, 0
	  },

	  setPixel: function(imageData, x, y, r, g, b, a) {
	    index = (x + y * imageData.width) * 4;
	    imageData.data[index+0] = r;
	    imageData.data[index+1] = g;
	    imageData.data[index+2] = b;
	    imageData.data[index+3] = a;
	  }
	}


/***/ }
/******/ ]);