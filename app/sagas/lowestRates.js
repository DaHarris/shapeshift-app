import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import * as api from '../api'
import * as actions from '../actions'
import * as actionCreators from '../actionCreators'

function* exchangeRatesRequest () {
  yield* takeLatest(actions.LOWEST_RATES_REQUEST, function* (action) {
    try {
      const rates = yield call(api.lowestRatesRequest)
      yield put(actionCreators.lowestRatesSuccess(rates))
    } catch (e) {
      yield put(actionCreators.lowestRatesFailure(e.message))
    }
  })
}

export default function* () {
  yield [
    exchangeRatesRequest()
  ]
}
