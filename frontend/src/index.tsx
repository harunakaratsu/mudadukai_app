import React from 'react'
import ReactDOM from 'react-dom'
import liff from '@line/liff/dist/lib'
import axios from 'axios'

import { App } from './App'
import './style.scss'

// pathが/か/newか/new/scannerならログインする
const requireLoginPath = [ '/', '/new', '/new/scanner' ]
if (requireLoginPath.includes(window.location.pathname)) {
  liff
    .init({ liffId: '1656846982-lLZ55apZ' })
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
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
