import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import * as api from '../api'
import * as actions from '../actions'
import * as actionCreators from '../actionCreators'

function* exchangeRatesRequest () {
  yield* takeLatest(actions.EXCHANGE_RATES_REQUEST, function* (action) {
    try {
      const exchanges = yield call(api.exchangeRatesRequest)
      yield put(actionCreators.exchangeRatesSuccess(exchanges))
    } catch (e) {
      yield put(actionCreators.exchangeRatesFailure(e.message))
    }
  })
}

export default function* () {
  yield [
    exchangeRatesRequest()
  ]
}
