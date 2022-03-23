import { memo, VFC } from 'react'
import { Box, Heading, Image, Text, Container } from '@chakra-ui/react'

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
        </Box>
      </Container>
    </Box>
  )
})
