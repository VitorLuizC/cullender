import test from 'ava'
import { cull, filters } from '../../'

const INTO = [ 1, 2, 3, 4 ]
const VALUES = [ 1, 2, 3, 4, 0, 6, 7, 34, 2, 2, 3, 4, 52, 1 ]
const INTO_VALUES = [ 1, 2, 3, 4, 2, 2, 3, 4, 1 ]

const DEEP_INTO = [ 'Vitor', 'Fernando' ]
const DEEP_VALUES = [ { name: 'Vitor' }, { name: 'Vitor' }, {}, null, { name: 'Neymar' } ]
const INTO_DEEP_VALUES = [ { name: 'Vitor' }, { name: 'Vitor' } ]

/**
 * Cullender into() filter tests.
 */

test('Cullender:filters:into return values into a list', (context) => {
  context.deepEqual(cull(VALUES, filters.into(INTO)), INTO_VALUES)
})

test('Cullender:filters:into return values (deep) into a list', (context) => {
  const getName = (user) => user && user.name
  context.deepEqual(cull(DEEP_VALUES, filters.into(DEEP_INTO, getName)), INTO_DEEP_VALUES)
})
