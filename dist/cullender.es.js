/*!
 * Cullender v0.2.0
 * © 2017-present Vitor Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */

import uncouple from 'uncouple';

/**
 * Default function.
 * @template T
 * @param {T} value
 * @returns {T}
 */
var DEFAULT_Λ = function (value) { return value; };

var ref$1 = uncouple(Array);
var includes = ref$1.includes;

/**
 * Check if value is into a list.
 * @template T
 * @param {Array.<T>} list
 * @param {function(T, number, T[]): *} λ
 * @returns {function(T, number, T[]): boolean}
 */
var into = function (list, λ) {
	if ( λ === void 0 ) λ = DEFAULT_Λ;

	return function () {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	return includes(list, λ.apply(void 0, args));

}	};

var ref$3 = uncouple(Array);
var every$2 = ref$3.every;
var reduce$1 = ref$3.reduceRight;

var compose = function () {
  var λs = [], len = arguments.length;
  while ( len-- ) λs[ len ] = arguments[ len ];

  var isValid = every$2(λs, function (λ) { return typeof λ === 'function'; });
  if (!isValid)
    { throw new Error('Can\'t compose non-function arguments.') }
  var composition = function (value) { return reduce$1(λs, function (value, λ) { return λ(value); }, value); };
  return composition
};

var ref$2 = uncouple(Array);
var join = ref$2.join;
var every$1 = ref$2.every;
var ref$1$1 = uncouple(String);
var normalize = ref$1$1.normalize;
var replace = ref$1$1.replace;
var trim = ref$1$1.trim;
var lower = ref$1$1.toLowerCase;
var split = ref$1$1.split;
var includes$1 = ref$1$1.includes;

/**
 * Merge text.
 * @param {string|string[]} value
 * @returns {string}
 */
var merge = function (value) { return Array.isArray(value) ? join(value, ' ') : value; };

/**
 * Remove multiple whitespaces.
 * @param {string} value
 * @returns {string}
 */
var whitespaces = function (value) { return replace(value, /\s{2,}/g, ' '); };

/**
 * Replace accents and special characters.
 * @example ```js
 * ('Olá, você') => 'Ola, voce'
 * ```
 * @param {string} value
 * @returns {string}
 */
var diacritics = compose(
  function (value) { return replace(value, /[\u0080-\uF8FF]/g, ''); },
  function (value) { return normalize(value, 'NFKD'); }
);

/**
 * Normalize text.
 * @param {(string|string[])} value
 * @returns {string}
 */
var normalizeText = compose(lower, whitespaces, trim, diacritics, merge);

var hasTerms = function (target) { return compose(
  function (terms) { return every$1(terms, function (term) { return includes$1(target, term); }); },
  function (term) { return split(term, ' '); },
  normalizeText
); };

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

  var target = normalizeText(λ.apply(void 0, args));
  var result = hasTerms(target)(terms);
  return result
};
};

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
	into: into,
	search: search,
	truthy: truthy
});

var ref = uncouple(Array);
var some = ref.some;
var every = ref.every;
var filter = ref.filter;
var reduce = ref.reduce;

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

  var check = type === 'AND' ? every : some;
  var result = check(λs, function (λ) { return λ.apply(void 0, args); });
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

  var result = reduce(λs, filter, [].concat( list ));
  return result
};

var index = { create: create, cull: cull, filters: filters };

export { filters, create, cull };
export default index;
