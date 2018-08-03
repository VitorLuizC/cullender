import { DEFAULT_Λ } from '../default'
import uncouple from 'uncouple'
import normalize from 'normalize-text'

const { every } = uncouple(Array.prototype)
const { split, includes } = uncouple(String.prototype)

/**
 * Search term.
 * @param {string} into
 * @returns {function(string):boolean}
 */
const searchTerm = (into) => (term) => includes(into, term)

/**
 * Search.
 * @param {string} into
 * @param {(string|Array.<string>)} terms
 * @returns {boolean}
 */
const search = (into, terms) => every(terms, searchTerm(into))

/**
 * @template T
 * @param {string} text
 * @param {function(T, number, T[]): (string|Array.<string>)} λ
 * @returns {function(T, number, T[]): boolean}
 */
export default (text, λ = DEFAULT_Λ) => (...args) => {
  const into = normalize(λ(...args))
  const terms = split(normalize(text), ' ')
  const result = search(into, terms)
  return result
}
