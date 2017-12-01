import { DEFAULT_Λ } from '../default'
import { remove as removeDiacritcs } from 'diacritics'

/**
 * Normalize text.
 * @param {(string|string[])} value
 * @returns {string}
 */
const normalizeText = (value) => {
  const text = Array.isArray(value) ? value.join(' ') : value
  const normalizedText = removeDiacritcs(text.trim()).toLowerCase()
  return normalizedText
}

/**
 * @template T
 * @param {string} terms
 * @param {function(T, number, T[]): (string|Array.<string>)} λ
 * @returns {function(T, number, T[]): boolean}
 */
export default (terms, λ = DEFAULT_Λ) => (...args) => {
  const text = normalizeText(λ(...args))
  const result = normalizeText(terms).split(' ').every((term) => text.includes(term))
  console.log('terms', terms.split(' '))
  return result
}
