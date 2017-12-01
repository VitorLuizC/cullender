import * as filters from './filters/index.js'

export const create = (type, ...λs) => (...args) => {
  const filter = (λ) => λ(...args)
  const result = type === 'AND' ? λs.every(filter) : λs.some(filter)
  return result
}

export const cull = (list, ...λs) => {
  const result = λs.reduce((list, λ) => list.filter(λ), [ ...list ])
  return result
}

export { filters }

export default { create, cull, filters }
