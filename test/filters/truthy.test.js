import test from 'ava'
import { cull, filters } from '../../'

const VALUES = [ false, 'Vitor', undefined, '0', undefined, '', null, NaN, 22.0, 0, true ]
const TRUTHY_VALUES = [ 'Vitor', '0', 22.0, true ]

const DEEP_VALUES = [ { name: 'Vitor' }, { name: '' }, {}, null, { name: 'Neymar' } ]
const TRUTHY_DEEP_VALUES = [ { name: 'Vitor' }, { name: 'Neymar' } ]

/**
 * Cullender truthy() filter tests.
 */

test('Cullender:filters:truthy return truthy values', (context) => {
  context.deepEqual(cull(VALUES, filters.truthy()), TRUTHY_VALUES)
})

test('Cullender:filters:truthy return truthy values (deep)', (context) => {
  const getName = (user) => user && user.name
  context.deepEqual(cull(DEEP_VALUES, filters.truthy(getName)), TRUTHY_DEEP_VALUES)
})
