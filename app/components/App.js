import React from 'react'

export default (ownProps) => {
  return (
    <div id='root-layout'>
      <h1>Bitcoin Exchange Rates</h1>
      {ownProps.children}
    </div>
  )
}
