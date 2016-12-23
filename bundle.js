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

	var _Core = __webpack_require__(1);

	var _Core2 = _interopRequireDefault(_Core);

	var _SimpleShader = __webpack_require__(3);

	var _SimpleShader2 = _interopRequireDefault(_SimpleShader);

	var _FragmentShader = __webpack_require__(4);

	var _FragmentShader2 = _interopRequireDefault(_FragmentShader);

	var _VertexShader = __webpack_require__(5);

	var _VertexShader2 = _interopRequireDefault(_VertexShader);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function Game(canvasID) {
	  _classCallCheck(this, Game);

	  _Core2.default.initializeWebGL(canvasID);
	  _Core2.default.clearCanvas([0, 0.8, 0, 1]);
	  var gl = _Core2.default.getGL();
	  this.shader = new _SimpleShader2.default(_VertexShader2.default, _FragmentShader2.default, gl);
	  this.shader.activateShader();
	  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	};

	var game = new Game('GLCanvas');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _VertexBuffer = __webpack_require__(2);

	var _VertexBuffer2 = _interopRequireDefault(_VertexBuffer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var singleton = void 0;

	var Core = function () {
	  function Core() {
	    _classCallCheck(this, Core);
	  }

	  _createClass(Core, [{
	    key: 'initializeWebGL',
	    value: function initializeWebGL(canvasId) {
	      var canvas = document.getElementById(canvasId);
	      this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

	      if (!this.gl) {
	        console.log('WebGL is not supported');
	      }

	      _VertexBuffer2.default.initialize(this.gl);
	    }
	  }, {
	    key: 'getGL',
	    value: function getGL() {
	      return this.gl;
	    }
	  }, {
	    key: 'clearCanvas',
	    value: function clearCanvas(color) {
	      this.gl.clearColor(color[0], color[1], color[2], color[3]);
	      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	    }
	  }]);

	  return Core;
	}();

	if (!singleton) {
	  console.log('new singleton');
	  singleton = new Core();
	}

	exports.default = singleton;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var singleton = void 0;

	var VertexBuffer = function () {
	  function VertexBuffer() {
	    _classCallCheck(this, VertexBuffer);

	    this.verticesOfSquare = [0.5, 0.5, 0.0, -0.5, 0.5, 0.0, 0.5, -0.5, 0.0, -0.5, -0.5, 0.0];
	  }

	  _createClass(VertexBuffer, [{
	    key: "initialize",
	    value: function initialize(gl) {
	      this.squareVertexBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, this.squareVertexBuffer);
	      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesOfSquare), gl.STATIC_DRAW);
	    }
	  }, {
	    key: "getGLVertexRef",
	    value: function getGLVertexRef() {
	      return this.squareVertexBuffer;
	    }
	  }]);

	  return VertexBuffer;
	}();

	if (!singleton) {
	  singleton = new VertexBuffer();
	}

	exports.default = singleton;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _VertexBuffer = __webpack_require__(2);

	var _VertexBuffer2 = _interopRequireDefault(_VertexBuffer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SimpleShader = function () {
	  function SimpleShader(vertexShaderSrc, fragmentShaderSrc, gl) {
	    _classCallCheck(this, SimpleShader);

	    this.gl = gl;

	    var vertexShader = this.compileShader(vertexShaderSrc, this.gl.VERTEX_SHADER, gl);
	    var fragmentShader = this.compileShader(fragmentShaderSrc, this.gl.FRAGMENT_SHADER, gl);

	    this.compiledShader = this.gl.createProgram();
	    this.gl.attachShader(this.compiledShader, vertexShader);
	    this.gl.attachShader(this.compiledShader, fragmentShader);

	    this.gl.linkProgram(this.compiledShader);

	    if (!gl.getProgramParameter(this.compiledShader, this.gl.LINK_STATUS)) {
	      return console.log('error linking shader');
	    }

	    this.shaderVertexPositionAttribute = this.gl.getAttribLocation(this.compiledShader, 'aSquareVertexPosition');
	    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, _VertexBuffer2.default.getGLVertexRef());
	    this.gl.vertexAttribPointer(this.shaderVertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
	  }

	  _createClass(SimpleShader, [{
	    key: 'compileShader',
	    value: function compileShader(shaderSrc, shaderType, gl) {
	      var compiledShader = gl.createShader(shaderType);
	      gl.shaderSource(compiledShader, shaderSrc);
	      gl.compileShader(compiledShader);

	      if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
	        console.log('shader compile error' + gl.getShaderInfoLog(compiledShader));
	      }

	      return compiledShader;
	    }
	  }, {
	    key: 'activateShader',
	    value: function activateShader() {
	      this.gl.useProgram(this.compiledShader);
	      this.gl.enableVertexAttribArray(this.shaderVertexPositionAttribute);
	    }
	  }, {
	    key: 'getShader',
	    value: function getShader() {
	      return this.compiledShader;
	    }
	  }]);

	  return SimpleShader;
	}();

	exports.default = SimpleShader;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "void main(void) { \n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); \n}\n"

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "attribute vec3 aSquareVertexPosition; \nvoid main(void) {\n  gl_Position = vec4(aSquareVertexPosition, 1.0);\n}\n"

/***/ }
/******/ ]);