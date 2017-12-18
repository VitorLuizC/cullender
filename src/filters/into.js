import { DEFAULT_Λ } from '../default'

/**
 * Check if value is into a list.
 * @template T
 * @param {Array.<T>} list
 * @param {function(T, number, T[]): *} λ
 * @returns {function(T, number, T[]): boolean}
 */
export default (list, λ = DEFAULT_Λ) => (...args) => list.includes(λ(...args))
