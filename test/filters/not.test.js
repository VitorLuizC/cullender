import test from 'ava'
import { cull, filters } from '../../'

const VALUES = [ false, 'Vitor', undefined, '0', undefined, '', null, NaN, 22.0, 0, true ]
const FALSY_VALUES = [ false, undefined, undefined, '', null, NaN, 0 ]

/**
 * Cullender not() filter tests.
 */

test('Cullender:filters:not return falsy values to any filter result', (context) => {
  const filter = filters.not(filters.truthy())
  context.deepEqual(cull(VALUES, filter), FALSY_VALUES)
})
