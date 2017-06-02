import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'

const createLogger = require('redux-logger')
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
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
  sagaMiddleware.run(rootSaga)
  return store
}
