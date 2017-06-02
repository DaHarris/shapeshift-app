import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import * as api from '../api'
import * as actions from '../actions'
import * as actionCreators from '../actionCreators'

function* historicalPricingRequest () {
  yield* takeLatest(actions.HISTORICAL_PRICING_REQUEST, function* (action) {
    try {
      let { exchangeName, pair } = action
      const historicalPricing = yield call(api.historicalPricingRequest, exchangeName, pair)
      yield put(actionCreators.historicalPricingSuccess(historicalPricing))
    } catch (e) {
      yield put(actionCreators.historicalPricingFailure(e.message))
    }
  })
}

export default function* () {
  yield [
    historicalPricingRequest()
  ]
}
