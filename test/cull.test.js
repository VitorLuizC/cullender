import test from 'ava'
import { cull } from '../'

/**
 * Cullender cull() tests.
 */

const NAMES = [ 'Vitor', undefined, 'Vitória', 'Marina', '', null ]
const TRUTHY_NAMES = [ 'Vitor', 'Vitória', 'Marina' ]
const NOT_VIT_NAMES = [ 'Marina' ]

const isTruthy = (name) => !!name
const isNotVit = (name) => !name.includes('Vit')

test('Cullender:cull returns new Array', (context) => {
  context.not(cull(NAMES), NAMES)
})

test('Cullender:cull filter using callbacks', (context) => {
  context.deepEqual(cull(NAMES, isTruthy), TRUTHY_NAMES)
})

test('Cullender:cull filter using callbacks', (context) => {
  context.deepEqual(cull(NAMES, isTruthy, isNotVit), NOT_VIT_NAMES)
})
