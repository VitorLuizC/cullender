import uncouple from 'uncouple'
import * as filters from './filters/index.js'

const { some, every, filter, reduce } = uncouple(Array)

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
  const check = type === 'AND' ? every : some
  const result = check(λs, (λ) => λ(...args))
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
  const result = reduce(λs, filter, [ ...list ])
  return result
}

export default { create, cull, filters }
