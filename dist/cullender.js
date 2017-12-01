(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.cullender = {})));
}(this, (function (exports) { 'use strict';

var DEFAULT_Λ = function (value) { return value; };

/**
 * Check if value is truthy.
 * @template T
 * @param {function(T, number, T[]): *} λ
 * @returns {function(T, number, T[]): boolean}
 */
var truthy = function (λ) {
	if ( λ === void 0 ) λ = DEFAULT_Λ;

	return function () {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	return !!λ.apply(void 0, args);

}	};



var filters = Object.freeze({
	truthy: truthy
});

var create = function (type) {
  var λs = [], len = arguments.length - 1;
  while ( len-- > 0 ) λs[ len ] = arguments[ len + 1 ];

  return function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var filter = function (λ) { return λ.apply(void 0, args); };
  var result = type === 'AND' ? λs.every(filter) : λs.some(filter);
  return result
};
};

var cull = function (list) {
  var λs = [], len = arguments.length - 1;
  while ( len-- > 0 ) λs[ len ] = arguments[ len + 1 ];

  var result = λs.reduce(function (list, λ) { return list.filter(λ); }, [].concat( list ));
  return result
};

var index = { create: create, cull: cull, filters: filters };

exports.create = create;
exports.cull = cull;
exports.filters = filters;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
