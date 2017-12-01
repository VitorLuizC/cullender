import test from 'ava'
import cullender, { cull, create, filters } from '../'

/**
 * Cullender module tests.
 * Check default API and exposed stuff.
 */

test('Cullender:module exports "cull" function', (context) => {
  context.is(typeof cull, 'function')
  context.is(cull, cullender.cull)
})

test('Cullender:module exports "create" function', (context) => {
  context.is(typeof create, 'function')
  context.is(create, cullender.create)
})

test('Cullender:module exports "filters"', (context) => {
  context.is(!!filters, true)
  context.is(typeof filters, 'object')
  context.is(filters, cullender.filters)
})
