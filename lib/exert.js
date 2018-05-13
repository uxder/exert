(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("exert", [], factory);
	else if(typeof exports === 'object')
		exports["exert"] = factory();
	else
		root["exert"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stream = undefined;

var _stream = __webpack_require__(1);

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.stream = _stream2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixin = __webpack_require__(2);

var _mixin2 = _interopRequireDefault(_mixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A stream class decorator.
 */
var stream = function stream(options) {
  return function decorator(targetClass) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var patchClass = (0, _mixin2.default)(targetClass, {
        options: options,
        // Initial properties decorated to to class.
        properties: {
          subscriptions: [],
          name: 'test2'
        },

        // Methods decorated to class.
        methods: {
          test: function test() {
            return 'asana';
          }
        }
      });
      return new (Function.prototype.bind.apply(patchClass, [null].concat(args)))();
    };
  };
};
exports.default = stream;
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * A way to extend / monkey patch an existing clas.
 * let patchedClass = mixin(targetClass,  {
 *   // Static props shared between all instances.
 *   staticProps: {
 *     count: []
 *   },
 *
 *   // Instance properties.  Equiv of adding this.name or this.lastName to class.
 *   properties: {
 *     name: 'Scott',
 *     lastName: 'Murphy'
 *   }
 *
 *   // Method definitions.
 *   methods: {
 *     getName: ()=> {
 *       return this.name;
 *     },
 *     myName: 'yoyo' // Technically you can add props here too.
 *   }
 * })
 */
var mixin = function mixin(targetClass, _ref) {
  var _ref$staticProps = _ref.staticProps,
      staticProps = _ref$staticProps === undefined ? {} : _ref$staticProps,
      _ref$methods = _ref.methods,
      methods = _ref$methods === undefined ? {} : _ref$methods,
      _ref$properties = _ref.properties,
      properties = _ref$properties === undefined ? {} : _ref$properties;

  var typeTag = Symbol('isa');

  for (var key in staticProps) {
    console.log(key);
    Object.defineProperty(targetClass, key, {
      value: staticProps[key],
      writable: true
    });
  }

  for (var _key in properties) {
    console.log(_key);
    Object.defineProperty(targetClass.prototype, _key, {
      value: properties[_key],
      writable: true
    });
  }

  for (var _key2 in methods) {
    console.log(_key2);
    Object.defineProperty(targetClass.prototype, _key2, {
      value: methods[_key2],
      writable: true
    });
  }

  Object.defineProperty(targetClass.prototype, typeTag, { value: true });
  return targetClass;
};

exports.default = mixin;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=exert.js.map