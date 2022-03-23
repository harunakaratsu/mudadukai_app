import { memo, useCallback, VFC } from 'react'
import { Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { HeaderDrawer } from '../organisms/HeaderDrawer'

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleToggle = useCallback(() => isOpen ? onClose() : onOpen(), [isOpen, onClose, onOpen])

  return (
    <Flex align='center' justify='space-between' wrap='wrap' px={{ base: 6, md: 20 }} py={6} bg='red.300' color='white'>
      <Heading as='h1' size='lg'>ミルミル</Heading>
      <HamburgerIcon w={{ base: 25, md: 35 }} h={{ base: 25, md: 35 }} onClick={handleToggle} />

      <HeaderDrawer isOpen={ isOpen } onClose={ onClose } />
    </Flex>
  )
})
