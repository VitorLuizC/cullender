/*!
 * Cullender v0.1.0
 * © 2017-present Vitor Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var diacritics = require('diacritics');

/**
 * Default function.
 * @template T
 * @param {T} value
 * @returns {T}
 */
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

/**
 * Normalize text.
 * @param {(string|string[])} value
 * @returns {string}
 */
var normalizeText = function (value) {
  var text = Array.isArray(value) ? value.join(' ') : value;
  var normalizedText = diacritics.remove(text.trim()).toLowerCase();
  return normalizedText
};

/**
 * @template T
 * @param {string} terms
 * @param {function(T, number, T[]): (string|Array.<string>)} λ
 * @returns {function(T, number, T[]): boolean}
 */
var search = function (terms, λ) {
  if ( λ === void 0 ) λ = DEFAULT_Λ;

  return function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var text = normalizeText(λ.apply(void 0, args));
  var result = normalizeText(terms).split(' ').every(function (term) { return text.includes(term); });
  console.log('terms', terms.split(' '));
  return result
};
};



var filters = Object.freeze({
	truthy: truthy,
	search: search
});

/**
 * Create a filter as result of other filter functions composition.
 * @param {('AND'|'OR')} type
 * @param {...Filter} λs
 * @returns {Filter}
 */
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

/**
 * Filter list using filter functions. Each filter refines the result.
 * @template T
 * @param {Iterable.<T>} list
 * @param {...Filter} λs
 * @returns {T[]}
 */
var cull = function (list) {
  var λs = [], len = arguments.length - 1;
  while ( len-- > 0 ) λs[ len ] = arguments[ len + 1 ];

  var result = λs.reduce(function (list, λ) { return list.filter(λ); }, [].concat( list ));
  return result
};

var index = { create: create, cull: cull, filters: filters };

exports.filters = filters;
exports.create = create;
exports.cull = cull;
exports['default'] = index;
