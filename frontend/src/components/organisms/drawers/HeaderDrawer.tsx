import { memo, useCallback, VFC } from 'react'
import { Link as Scroll } from 'react-scroll'
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Stack, Link, Button } from '@chakra-ui/react'

type Props = {
  isOpen: boolean,
  onClose: () => void
}

export const HeaderDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props

  const onClickButton = useCallback(() => onClose(), [onClose])

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} >
      <DrawerOverlay />
      <DrawerContent bg='red.300' color='white'>
        <DrawerCloseButton />
        <DrawerBody mt={50}>
          <Stack spacing={5}>
            <Link href='/use'>使い方</Link>
            <Link href='https://docs.google.com/forms/d/e/1FAIpQLScqyZMJqHjK1nLYrVGp7MxHXwxZRzj-MunGWwOFES6bYQNUoA/viewform'>お問い合わせ</Link>
            <Link href='/terms'>利用規約</Link>
            <Link href='/privacy_policy'>プライバシーポリシー</Link>
            <Scroll to='addFriend'>
              <Button variant='outline' _hover={{ bg: 'white', color: 'red.400' }} onClick={ onClickButton }>
                友達追加する
              </Button>
            </Scroll>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
})
