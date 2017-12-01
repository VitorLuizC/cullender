import * as filters from './filters/index.js'

/**
 * Filter function.
 * @template T
 * @typedef {function(T, number, T[]):boolean} Filter
 */

/**
 * Filters namespace.
 * @type {Object.<string, Filter>}
 */
export { filters }

/**
 * Create a filter as result of other filter functions composition.
 * @param {('AND'|'OR')} type
 * @param {...Filter} λs
 * @returns {Filter}
 */
export const create = (type, ...λs) => (...args) => {
  const filter = (λ) => λ(...args)
  const result = type === 'AND' ? λs.every(filter) : λs.some(filter)
  return result
}

/**
 * Filter list using filter functions. Each filter refines the result.
 * @template T
 * @param {Iterable.<T>} list
 * @param {...Filter} λs
 * @returns {T[]}
 */
export const cull = (list, ...λs) => {
  const result = λs.reduce((list, λ) => list.filter(λ), [ ...list ])
  return result
}

export default { create, cull, filters }
