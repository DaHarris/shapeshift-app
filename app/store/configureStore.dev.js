import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'

const createLogger = require('redux-logger')
const middlewares = []
const loggerMiddleware = createLogger({
  predicate: (getState, action) => !/^redux-form\//.test(action.type)
})
middlewares.push(loggerMiddleware)

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}
