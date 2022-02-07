import { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import liff from '@line/liff/dist/lib'
import axios from 'axios'
import { Router } from './Router'

export const App = () => {
  useEffect(() => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string })
        .then(() => {
          // ログインしていなかったらログインする
          if (!liff.isLoggedIn()) {
            liff.login()
          }

          const idToken = liff.getIDToken()
          const params = new URLSearchParams()
          params.append("idToken", idToken as string)
          axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, params)
              .then(res => {
                // IdTokenの有効期限が切れたらログアウトする
                if (res.data.error_description === 'IdToken expired.') {
                  liff.logout()
                }
              })
              .catch(e => console.error(e))
        })
  }, [])

  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  )
}
