var SJCarousel =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SJCarousel =
/*#__PURE__*/
function () {
  function SJCarousel() {
    var _this = this;

    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.sj-carousel-container';

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        autoScroll = _ref.autoScroll,
        visibleCount = _ref.visibleCount,
        keyboardListenerOnDoc = _ref.keyboardListenerOnDoc;

    _classCallCheck(this, SJCarousel);

    _defineProperty(this, "indicatorListeners", []);

    _defineProperty(this, "goToPrev", function () {
      var activeElement = _this.activeElement;
      var length = _this.carouselElements.length;

      _this.goToElement((activeElement + length - 1) % length);
    });

    _defineProperty(this, "goToNext", function () {
      var activeElement = _this.activeElement;
      var length = _this.carouselElements.length;

      _this.goToElement((activeElement + 1) % length);
    });

    _defineProperty(this, "keydownHandler", function (_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode === 37) {
        // Using requestAnimationFrame due to weird chrome bug: https://stackoverflow.com/questions/57753794/weird-keydown-behavior-in-chrome-when-triggered-simultaneously
        // Left key
        _this.rAF(_this.goToPrev);
      } else if (keyCode === 39) {
        // Right key
        _this.rAF(_this.goToNext);
      }
    });

    _defineProperty(this, "windowResized", function () {
      _this.containerWidth = _this.carouselContainer.getBoundingClientRect().width;

      _this.setContentWidth();

      _this.goToElement(_this.activeElement);
    });

    this.carouselContainer = typeof el === 'string' ? document.querySelector(el) : el;

    if (!this.carouselContainer) {
      return;
    }

    this.carouselElements = Array.from(this.carouselContainer.querySelectorAll('.sj-carousel-slide'));
    this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
    this.carouselContent = this.carouselContainer.querySelector('.sj-carousel-content');
    this.activeElement = 0;
    this.visibleCount = visibleCount || 1;
    this.keyboardListenerOnDoc = keyboardListenerOnDoc;
    this.setContentWidth();
    this.goToElement(this.activeElement);
    this.addIndicatorEvents();
    this.setLeftRightNavigation();
    this.addKeyboardEvents();
    this.addResizeEventHandler();
    this.removeResizeEventHandler();

    if (autoScroll) {
      this.autoScroll();
    }
  }

  _createClass(SJCarousel, [{
    key: "rAF",
    value: function rAF(callback) {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(callback);
      } else {
        window.setTimeout(callback, 1000 / 60);
      }
    }
  }, {
    key: "autoScroll",
    value: function autoScroll() {
      var _this2 = this;

      this.scrollTimeout = setTimeout(function () {
        _this2.goToNext();

        _this2.autoScroll();
      }, 6000);
    }
  }, {
    key: "setContentWidth",
    value: function setContentWidth() {
      var _this3 = this;

      this.carouselElements.forEach(function (el) {
        el.style.flexBasis = "".concat(_this3.containerWidth / _this3.visibleCount, "px");
      });
    }
  }, {
    key: "goToElement",
    value: function goToElement(position) {
      this.activeElement = position;
      this.carouselContent.style.transform = "translateX(".concat(position * (this.containerWidth / this.visibleCount) * -1, "px)");
    }
  }, {
    key: "addIndicatorEvents",
    value: function addIndicatorEvents() {
      var _this4 = this;

      this.carouselIndicators = Array.from(this.carouselContainer.querySelectorAll('.sj-carousel-indicators'));
      this.carouselIndicators.forEach(function (indicator, index) {
        var cb = function cb() {
          _this4.goToElement(index);
        };

        _this4.indicatorListeners.push(cb);

        indicator.addEventListener('click', cb);
      });
    }
  }, {
    key: "removeCarouselIndicatorEvents",
    value: function removeCarouselIndicatorEvents() {
      var _this5 = this;

      this.carouselIndicators.forEach(function (indicator, index) {
        indicator.removeEventListener('click', _this5.indicatorListeners[index]);
      });
    }
  }, {
    key: "addKeyboardEvents",
    value: function addKeyboardEvents() {
      if (this.keyboardListenerOnDoc) {
        document.addEventListener('keydown', this.keydownHandler);
      } else {
        this.carouselContainer.addEventListener('keydown', this.keydownHandler);
      }
    }
  }, {
    key: "removeKeyBoardEvents",
    value: function removeKeyBoardEvents() {
      if (this.keyboardListenerOnDoc) {
        document.removeEventListener('keydown', this.keydownHandler);
      } else {
        this.carouselContainer.removeEventListener('keydown', this.keydownHandler);
      }
    }
  }, {
    key: "setLeftRightNavigation",
    value: function setLeftRightNavigation() {
      var prev = document.querySelector('.sj-carousel-prev');
      var next = document.querySelector('.sj-carousel-next');
      prev.addEventListener('click', this.goToPrev);
      next.addEventListener('click', this.goToNext);
    }
  }, {
    key: "removeLeftRightNavigation",
    value: function removeLeftRightNavigation() {
      var prev = document.querySelector('.sj-carousel-prev');
      var next = document.querySelector('.sj-carousel-next');
      prev.removeEventListener('click', this.goToPrev);
      next.removeEventListener('click', this.goToNext);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      this.removeCarouselIndicatorEvents();
      this.removeKeyBoardEvents();
      this.removeLeftRightNavigation();
      this.removeResizeEventHandler();
    }
  }, {
    key: "addResizeEventHandler",
    value: function addResizeEventHandler() {
      window.addEventListener('resize', this.windowResized);
    }
  }, {
    key: "removeResizeEventHandler",
    value: function removeResizeEventHandler() {
      window.addEventListener('resize', this.windowResized);
    }
  }]);

  return SJCarousel;
}();

module.exports = SJCarousel;

/***/ })
/******/ ]);