import { useCallback } from "react"
import liff from "@line/liff/dist/lib"
import axios from "axios"

type Props = {
  liffId: string
}

export const useLogin = () => {
  const login = useCallback((props: Props) => {
    const { liffId } = props

    // ログインする
    liff.init({ liffId: liffId as string })
        .then(() => {
          // ログインしていなかったらログインする
          if (!liff.isLoggedIn()) {
            liff.login()
          }

          const idToken = liff.getIDToken()
          const params = new URLSearchParams()
          params.append("idToken", idToken as string)
          axios.post("/users", params)
              .then(res => {
                // IdTokenの有効期限が切れたらログアウトする
                if (res.data.error_description === 'IdToken expired.') {
                  liff.logout()
                }
              })
              .catch(e => console.error(e))
        })
  }, [])

  return { login }
}