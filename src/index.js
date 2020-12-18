import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './assets/styles/main.scss'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/index'

export const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
)
