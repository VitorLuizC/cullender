import { DEFAULT_Λ } from '../default'

/**
 * Check if value is truthy.
 * @template T
 * @param {function(T, number, T[]): *} λ
 * @returns {function(T, number, T[]): boolean}
 */
export default (λ = DEFAULT_Λ) => (...args) => !!λ(...args)
