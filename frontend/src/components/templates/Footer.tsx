import { memo, VFC } from 'react'
import { Box, Text } from '@chakra-ui/react'

export const Footer: VFC = memo(() => {
  return (
    <Box py={{ base: 2, md: 5 }} bg='red.300'>
      <Text fontSize='sm' color='white' textAlign='center'>
        &copy; { new Date().getFullYear() } mirumiru
      </Text>
    </Box>
  )
})
