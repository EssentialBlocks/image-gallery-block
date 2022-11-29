/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
window.addEventListener("DOMContentLoaded", function (event) {
  var imageGalleries = document.querySelectorAll(".eb-gallery-img-wrapper.eb-filterable-img-gallery");

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function numberGreaterThan50(itemElem) {
      var number = itemElem.querySelector(".number").textContent;
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function ium(itemElem) {
      var name = itemElem.querySelector(".name").textContent;
      return name.match(/ium$/);
    }
  };
  var _iterator = _createForOfIteratorHelper(imageGalleries),
    _step;
  try {
    var _loop = function _loop() {
      var imageGallery = _step.value;
      var wrapperid = imageGallery.getAttribute("data-id");

      // add class is-checked
      imageGallery.closest(".eb-parent-wrapper").querySelector(".filter-wrapper-".concat(wrapperid, " :first-child")).classList.add("is-checked");
      iso = "";
      imagesLoaded(imageGallery, function () {
        if (imageGallery.classList.contains("grid")) {
          iso = new Isotope(".".concat(wrapperid), {
            itemSelector: ".eb-gallery-img-content",
            layoutMode: "fitRows"
          });
        } else {
          iso = new Isotope(".".concat(wrapperid), {
            itemSelector: ".eb-gallery-img-content",
            percentPosition: true,
            masonry: {
              columnWidth: ".eb-gallery-img-content"
            }
          });
        }
      });

      // bind filter button click
      filtersElem = imageGallery.closest(".eb-parent-wrapper").querySelectorAll(".filter-wrapper-".concat(wrapperid, " li"));
      filtersElem.length > 0 && filtersElem.forEach(function (item) {
        item.addEventListener("click", function (event) {
          var imageGallery = item.closest(".eb-parent-wrapper").querySelector(".".concat(wrapperid));
          filterValue = event.target.getAttribute("data-filter");
          // use matching filter function
          filterValue = filterFns[filterValue] || filterValue;
          iso = Isotope.data(imageGallery);
          iso.arrange({
            filter: filterValue
          });
          // iso.destroy();
        });
      });

      // change is-checked class on buttons
      buttonGroups = document.querySelectorAll(".filter-wrapper-".concat(wrapperid));
      for (i = 0, len = buttonGroups.length; i < len; i++) {
        buttonGroup = buttonGroups[i];
        radioButtonGroup(buttonGroup);
      }
      function radioButtonGroup(buttonGroup) {
        buttonGroup.addEventListener("click", function (event) {
          // only work with buttons
          if (!matchesSelector(event.target, "li")) {
            return;
          }
          buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
          event.target.classList.add("is-checked");
        });
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var iso;
      var filtersElem;
      var buttonGroups;
      var i, len;
      var buttonGroup;
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
});
/******/ })()
;
//# sourceMappingURL=index.js.map