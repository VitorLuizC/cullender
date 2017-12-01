import test from 'ava'
import { cull, filters } from '../../'

const VALUES = [ 'Mônica Cavalcanti', 'Monique Coimbra', 'Mordecoi Augusto', 'Enzo Oliveira', 'Enzo Augusto' ]
const MON_VALUES = [ 'Mônica Cavalcanti', 'Monique Coimbra' ]
const MO_COI_VALUES = [ 'Monique Coimbra', 'Mordecoi Augusto' ]

/**
 * Cullender search() filter tests.
 */

test('Cullender:filters:search return search results', (context) => {
  context.deepEqual(cull(VALUES, filters.search('mon')), MON_VALUES)
})

test('Cullender:filters:search returns result for multiple search terms', (context) => {
  context.deepEqual(cull(VALUES, filters.search('mo COI', (name) => [ name ])), MO_COI_VALUES)
})
