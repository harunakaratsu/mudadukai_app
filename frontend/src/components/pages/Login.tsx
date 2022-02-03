import { memo, VFC } from 'react'
import { Button } from '@chakra-ui/react'
import liff from '@line/liff/dist/lib'

export const Login:VFC = memo(() => {
  const getProfile = () => {
    liff.getProfile()
        .then(profile => alert(`Name: ${ profile.displayName }`))
        .catch((e) => console.error(e))
  }
                      
  return (
    <Button onClick={ getProfile }>get profile</Button>
  )
})