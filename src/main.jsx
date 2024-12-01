import React from 'react'
import ReactDOM from 'react-dom/client'
import Parse from 'parse/dist/parse.min.js'

import App from './App.jsx'

import './styles.css'

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'MspIRJCe9DCaov9UL3kUexAa7g3yCKYnBvOrD6D0'
const PARSE_HOST_URL = 'https://parseapi.back4app.com/'
const PARSE_JAVASCRIPT_KEY = 'Rn6Og31xstfgmI7x5JmA5B3bYmfrZzobUUrS8402'

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)
Parse.serverURL = PARSE_HOST_URL

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
