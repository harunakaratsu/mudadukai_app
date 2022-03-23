import React from 'react'
import ReactDOM from 'react-dom'
import liff from '@line/liff/dist/lib'
import axios from 'axios'

import { App } from './App'
import './style.scss'

liff
  .init({ liffId: process.env.REACT_APP_LIFF_ID as string })
  .then(() => {
    // ログインしていなかったらログインする
    if (!liff.isLoggedIn()) {
      liff.login()
    }

    const idToken = liff.getIDToken()
    const params = new URLSearchParams()
    params.append('idToken', idToken as string)
    axios
      .post('/users', params)
      .then(res => {
        // IdTokenの有効期限が切れたらログアウトする
        if (res.data.error_description === 'IdToken expired.') {
          liff.logout()
        }
      })
      .then(() => {
        ReactDOM.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
          document.getElementById('root')
        )
      })
      .catch(e => console.error(e))
  })
