import React from 'react'
import ExchangeTable from './ExchangeTable'
import LowestRates from './LowestRates'
import HistoricalPricing from './HistoricalPricing'

export default (ownProps) => {
  return (
    <div id='root-layout'>
      {ownProps.children}
      <LowestRates />
      <br />
      <br />
      <ExchangeTable />
      <br />
      <br />
      <HistoricalPricing />
    </div>
  )
}
