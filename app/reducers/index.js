import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as actions from '../actions'

let defaultExchangesState = {
  loaded: null,
  exchanges: [],
  error: null
}

const exchanges = (state = defaultExchangesState, action) => {
  let newState
  switch (action.type) {
    case actions.EXCHANGE_RATES_REQUEST:
      newState = Object.assign({}, state)
      newState.loaded = false
      newState.error = null
      return newState
    case actions.EXCHANGE_RATES_SUCCESS:
      newState = Object.assign({}, state)
      newState.loaded = true
      newState.exchanges = action.exchanges
      newState.error = null
      return newState
    case actions.EXCHANGE_RATES_FAILURE:
      newState = Object.assign({}, state)
      newState.loaded = true
      newState.error = action.error
      return newState
    default:
      return state
  }
}

let defaultLowestRatesState = {
  loaded: null,
  rates: [],
  error: null
}

const lowestRates = (state = defaultLowestRatesState, action) => {
  let newState
  switch (action.type) {
    case actions.LOWEST_RATES_REQUEST:
      newState = Object.assign({}, state)
      newState.loaded = false
      newState.error = null
      return newState
    case actions.LOWEST_RATES_SUCCESS:
      newState = Object.assign({}, state)
      newState.loaded = true
      newState.rates = action.rates
      newState.error = null
      return newState
    case actions.LOWEST_RATES_FAILURE:
      newState = Object.assign({}, state)
      newState.loaded = true
      newState.error = action.error
      return newState
    default:
      return state
  }
}

let defaultHistoricalPricingState = {
  loaded: null,
  exchangeName: null,
  pair: null,
  historicalPricing: {},
  error: null,
  filter: 'ask'
}

const historicalPricing = (state = defaultHistoricalPricingState, action) => {
  let newState
  switch (action.type) {
    case actions.HISTORICAL_PRICING_REQUEST:
      let { exchangeName, pair } = action
      newState = Object.assign({}, state)
      newState.loaded = false
      newState.exchangeName = exchangeName
      newState.pair = pair
      newState.error = null
      return newState
    case actions.HISTORICAL_PRICING_SUCCESS:
      newState = Object.assign({}, state)
      newState.loaded = true
      newState.historicalPricing = action.historicalPricing
      newState.error = null
      return newState
    case actions.HISTORICAL_PRICING_FAILURE:
      newState = Object.assign({}, state)
      newState.loaded = true
      newState.error = action.error
      return newState
    case actions.HISTORICAL_PRICING_FILTER_SELECTED:
      newState = Object.assign({}, state)
      newState.filter = action.filter
      return newState
    default:
      return state
  }
}

const rootReducer = combineReducers({
  exchanges,
  lowestRates,
  historicalPricing,
  routing
})

export default rootReducer
