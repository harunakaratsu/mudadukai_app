import { memo, VFC } from 'react'
import { Box, Heading, Image, Text, Container, Center } from '@chakra-ui/react'

export const AddFriend: VFC = memo(() => {
  return (
    <Box py={10} id='addFriend'>
      <Container maxW='container.lg'>
        <Heading as='h1' size='lg' textAlign='center' py={10}>
          友達追加する
        </Heading>
        <Box>
          <Text fontSize='sm' align='center'>LINEの友達に追加してはじめる</Text>
          <Text align='center'>↓↓</Text>
          <Image src='https://qr-official.line.me/sid/L/107zqgdd.png' boxSize={{ base: 100, md: 150}} mx='auto' />
          <Center py={3}>
            <a href='https://lin.ee/QPOfrLl'>
              <img src='https://scdn.line-apps.com/n/line_add_friends/btn/ja.png' alt='友だち追加' style={{ border: 0, maxWidth: '150px' }} />
            </a>
          </Center>
        </Box>
      </Container>
    </Box>
  )
})
