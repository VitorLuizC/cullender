import uncouple from 'uncouple'

const { every, reduceRight: reduce } = uncouple(Array)

export default (...λs) => {
  const isValid = every(λs, (λ) => typeof λ === 'function')
  if (!isValid)
    throw new Error('Can\'t compose non-function arguments.')
  const composition = (value) => reduce(λs, (value, λ) => λ(value), value)
  return composition
}
