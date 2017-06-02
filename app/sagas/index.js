import { spawn } from 'redux-saga/effects'

import exchangeSagas from './exchange'
import lowestRatesSagas from './lowestRates'
import historicalPricing from './historicalPricing'

export default function* root () {
  yield spawn(exchangeSagas)
  yield spawn(lowestRatesSagas)
  yield spawn(historicalPricing)
}
