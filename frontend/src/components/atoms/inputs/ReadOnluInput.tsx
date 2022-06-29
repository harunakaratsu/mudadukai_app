import { memo, FC } from 'react'
import { Input } from '@chakra-ui/react'

type Props = {
  value: number | string
}

export const ReadOnlyInput: FC<Props> = memo((props) => {
  const { value } = props

  return (
    <Input 
      _focus={{ boxShadow: 'none'}} 
      value={ value }
      bg='white' 
      readOnly
    />
  )
})
