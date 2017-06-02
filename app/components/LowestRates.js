import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actionCreators from '../actionCreators'

class LowestRates extends Component {

  componentDidMount () {
    let { loaded, getLowestRates } = this.props
    if (loaded === null) {
      getLowestRates()
    }
  }

  render () {
    let { rates, loaded, error } = this.props
    if (!loaded) {
      return null
    } else {
      let errorMessage = null
      if (error) {
        errorMessage = <div id='error-message' style={{textAlign: 'center'}}>{error}</div>
      }
      return (
        <div className='rate-tables'>
          <h3 className='rate-header' style={{textAlign: 'center'}}>Lowest Exchange Rates</h3>
          <table style={{width: '100%'}}>
            <tr style={{border: '1px solid grey'}}>
              <th>Symbol</th>
              <th>Exchange</th>
              <th>Ask</th>
            </tr>
            {Object.keys(rates).map((pair) => {
              let rate = rates[pair]
              return (
                <tr key={`rate:${pair}`}>
                  <th>{pair}</th>
                  <th>{rate.lowestExchange}</th>
                  <th>{rate.lowestPrice}</th>
                </tr>
              )
            })}
          </table>
          {errorMessage}
        </div>
      )
    }
  }
}

const mapStateToProps = (state, { params }) => ({
  rates: state.lowestRates.rates,
  loaded: state.lowestRates.loaded,
  error: state.lowestRates.error
})

const mapDispatchToProps = (dispatch) => ({
  getLowestRates () {
    dispatch(actionCreators.lowestRatesRequest())
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LowestRates))
