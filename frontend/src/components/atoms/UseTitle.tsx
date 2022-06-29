import { memo, FC } from 'react'
import { Heading } from '@chakra-ui/react'

type Props = {
  children: string
}

export const UseTitle: FC<Props> = memo((props) => {
  const { children } = props

  return (
    <Heading
      as='h4'
      size='md'
      mb={5}
      style={{ background: '#a1a1a1', color: '#fff', padding: '20px', borderRadius:'4px', marginBottom: '60px' }}
    >
      { children }
    </Heading>
  )
})