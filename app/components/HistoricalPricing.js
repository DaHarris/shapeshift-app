import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Line as LineChart } from 'react-chartjs'
import * as actionCreators from '../actionCreators'

class HistoricalPricing extends Component {

  render () {
    let { historicalPricing, exchangeName, pair, loaded, error, filter, historicalPricingFilterSelected } = this.props
    if (!loaded) {
      return null
    } else {
      let errorMessage = null
      if (error) {
        errorMessage = <div id='error-message'>{error}</div>
      }
      let pairData = historicalPricing.history
      let labels = []
      let datasetAggregator = []
      pairData.map(function (data) {
        data.timeStamp ? labels.push(new Date(data.timeStamp).toISOString()) : labels.push('-')
        datasetAggregator.push(data[filter])
      })
      let datasets = [{
        label: filter,
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: datasetAggregator
      }]
      let chartData = {
        labels: labels,
        datasets: datasets
      }
      return (
        <div style={{textAlign: 'center'}}>
          <h3 className='rate-header'>{`Historical Rates for ${pair} on ${exchangeName}`}</h3>
          <form style={{textAlign: 'center'}}>
            <div className='radio' style={{width: '6%'}}>
              <label>
                <input type='radio' value='ask' checked={filter === 'ask'} onChange={() => { historicalPricingFilterSelected('ask') }} />
                Ask
              </label>
            </div>
            <div className='radio' style={{width: '6%'}}>
              <label>
                <input type='radio' value='bid' checked={filter === 'bid'} onChange={() => { historicalPricingFilterSelected('bid') }} />
                Bid
              </label>
            </div>
            <div className='radio' style={{width: '6%'}}>
              <label>
                <input type='radio' value='low' checked={filter === 'low'} onChange={() => { historicalPricingFilterSelected('low') }} />
                Low
              </label>
            </div>
            <div className='radio' style={{width: '6%'}}>
              <label>
                <input type='radio' value='high' checked={filter === 'high'} onChange={() => { historicalPricingFilterSelected('high') }} />
                High
              </label>
            </div>
            <div className='radio' style={{width: '6%'}}>
              <label>
                <input type='radio' value='last' checked={filter === 'last'} onChange={() => { historicalPricingFilterSelected('last') }} />
                Last
              </label>
            </div>
          </form>
          {errorMessage}
          <LineChart data={chartData} width='1000' height='300' />
        </div>
      )
    }
  }
}

const mapStateToProps = (state, { params }) => ({
  historicalPricing: state.historicalPricing.historicalPricing,
  exchangeName: state.historicalPricing.exchangeName,
  pair: state.historicalPricing.pair,
  loaded: state.historicalPricing.loaded,
  error: state.historicalPricing.error,
  filter: state.historicalPricing.filter
})

const mapDispatchToProps = (dispatch) => ({
  historicalPricingFilterSelected (filter) {
    dispatch(actionCreators.historicalPricingFilterSelected(filter))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalPricing))
