import * as actions from '../actions'

export function exchangeRatesRequest () {
  return {
    type: actions.EXCHANGE_RATES_REQUEST
  }
}

export function exchangeRatesSuccess (exchanges) {
  return {
    type: actions.EXCHANGE_RATES_SUCCESS,
    exchanges
  }
}

export function exchangeRatesFailure (error) {
  return {
    type: actions.EXCHANGE_RATES_FAILURE,
    error
  }
}

export function lowestRatesRequest () {
  return {
    type: actions.LOWEST_RATES_REQUEST
  }
}

export function lowestRatesSuccess (rates) {
  return {
    type: actions.LOWEST_RATES_SUCCESS,
    rates
  }
}

export function lowestRatesFailure (error) {
  return {
    type: actions.LOWEST_RATES_FAILURE,
    error
  }
}

export function historicalPricingRequest (exchangeName, pair) {
  return {
    type: actions.HISTORICAL_PRICING_REQUEST,
    exchangeName,
    pair
  }
}

export function historicalPricingSuccess (historicalPricing) {
  return {
    type: actions.HISTORICAL_PRICING_SUCCESS,
    historicalPricing
  }
}

export function historicalPricingFailure (error) {
  return {
    type: actions.HISTORICAL_PRICING_FAILURE,
    error
  }
}

export function historicalPricingFilterSelected (filter) {
  return {
    type: actions.HISTORICAL_PRICING_FILTER_SELECTED,
    filter
  }
}
