import { DEFAULT_Λ } from '../default'
import uncouple from 'uncouple'

const { includes } = uncouple(Array)

/**
 * Check if value is into a list.
 * @template T
 * @param {Array.<T>} list
 * @param {function(T, number, T[]): *} λ
 * @returns {function(T, number, T[]): boolean}
 */
export default (list, λ = DEFAULT_Λ) => (...args) => includes(list, λ(...args))
