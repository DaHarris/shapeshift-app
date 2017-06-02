import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actionCreators from '../actionCreators'

class ExchangeTable extends Component {

  componentDidMount () {
    let { loaded, getExchangeRates } = this.props
    if (loaded === null) {
      getExchangeRates()
    }
  }

  callGetHistoricalPricing (exchangeName, pair) {
    let { getHistoricalPricing } = this.props
    getHistoricalPricing(exchangeName, pair)
    return false
  }

  render () {
    let { exchanges, loaded, getHistoricalPricing, error } = this.props
    if (!loaded) {
      return null
    } else {
      let errorMessage = null
      if (error) {
        errorMessage = <div id='error-message' style={{textAlign: 'center'}}>{error}</div>
      }
      return (
        <div className='exchange-tables'>
          {errorMessage}
          {exchanges.map((exchange) => {
            return (
              <div key={`exchange:${exchange._id}`}>
                <h3 className='exchange-header' style={{textAlign: 'center'}}>{`${exchange.exchangeName} Rates`}</h3>
                <table style={{width: '100%'}}>
                  <tr style={{border: '1px solid grey'}}>
                    <th>Symbol</th>
                    <th>Ask</th>
                    <th>Bid</th>
                    <th>Last</th>
                    <th>Low</th>
                    <th>High</th>
                    <th>View History</th>
                  </tr>
                  {exchange.tickers.map((ticker) => {
                    return (
                      <tr key={`ticker:${ticker._id}`}>
                        <th>{ticker.symbol}</th>
                        <th>{ticker.ask}</th>
                        <th>{ticker.bid}</th>
                        <th>{ticker.last}</th>
                        <th>{ticker.low}</th>
                        <th>{ticker.high}</th>
                        <th><button onClick={() => { this.callGetHistoricalPricing(exchange.exchangeName, ticker.symbol) }}>Historical Pricing</button></th>
                      </tr>
                    )
                  })}
                </table>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = (state, { params }) => ({
  exchanges: state.exchanges.exchanges,
  loaded: state.exchanges.loaded,
  error: state.exchanges.error
})

const mapDispatchToProps = (dispatch) => ({
  getExchangeRates () {
    dispatch(actionCreators.exchangeRatesRequest())
  },
  getHistoricalPricing (exchangeName, pair) {
    dispatch(actionCreators.historicalPricingRequest(exchangeName, pair))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeTable))
