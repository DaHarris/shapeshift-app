import xhr from 'xhr'

// Exchange Endpoints
const exchangeURL = 'http://localhost:3000/exchanges'

const exchangeRatesRequest = function () {
  let options = {
    url: exchangeURL,
    json: true
  }

  return new Promise((resolve, reject) => {
    xhr.get(options, (err, resp) => {
      err ? reject(errorHandler(err, 'Exchange')) : resolve(resp.body)
    })
  })
}

// Lowest Rate Endpoints
const rankingsURL = 'http://localhost:3001/rankings'

const lowestRatesRequest = function () {
  let options = {
    url: rankingsURL,
    json: true
  }

  return new Promise((resolve, reject) => {
    xhr.get(options, (err, resp) => {
      err ? reject(errorHandler(err, 'Rate')) : resolve(resp.body)
    })
  })
}

// Historical Pricing Endpoints
const historicalPricingURL = 'http://localhost:3002/history'

const historicalPricingRequest = function (exchangeName, pair) {
  let url = historicalPricingURL + '/exchange/' + exchangeName + '/pair/' + pair
  let options = {
    url: url,
    json: true
  }

  return new Promise((resolve, reject) => {
    xhr.get(options, (err, resp) => {
      err ? reject(errorHandler(err, 'History')) : resolve(resp.body)
    })
  })
}

// Error handler, returns default api down message if not a server error
const errorHandler = function (err, api) {
  if (err.message !== '[object ProgressEvent]') {
    return err
  } else {
    return {message: 'Error: the ' + api + ' API is not running.'}
  }
}

module.exports = {
  exchangeRatesRequest,
  lowestRatesRequest,
  historicalPricingRequest
}
