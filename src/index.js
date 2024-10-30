import './fonts/Roboto/font-family Roboto.css'
import './fonts/Fira-Sans/font-family Fira-Sans.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './Components/App'
import appStore from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
)
