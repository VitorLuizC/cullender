import test from 'ava'
import { create } from '../'

/**
 * Cullender create() tests.
 */

const NAMES = [ 'Vitor', undefined, 'Vitória', 'Marina', '', null ]
const FILLED_AND_ODD_NAMES = [ 'Marina' ]
const FILLED_OR_ODD_NAMES = [ 'Vitor', undefined, 'Vitória', 'Marina', null ]
const NOT_VIT_NAMES = [ 'Marina' ]

const isOdd = (_, index) => index % 2 === 1
const isFilled = (name) => typeof name === 'string' && !!name.trim()

test('Cullender:create creates a filter functions', (context) => {
  const isFilledAndOdd = create('AND', isFilled, isOdd)
  const isFilledOrOdd = create('OR', isFilled, isOdd)

  context.deepEqual(NAMES.filter(isFilledAndOdd), FILLED_AND_ODD_NAMES)
  context.deepEqual(NAMES.filter(isFilledOrOdd), FILLED_OR_ODD_NAMES)
})
