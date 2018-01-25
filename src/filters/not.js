/**
 * Not filter.
 * @template T
 * @param {function(T, number, T[]): boolean} filter
 * @returns {function(T, number, T[]): boolean}
 */
export default (filter) => (...args) => !filter(...args)
