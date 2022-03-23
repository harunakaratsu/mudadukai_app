import { ChangeEvent, memo, VFC } from 'react'
import { Input } from '@chakra-ui/react'

type Props = {
  value: number | string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: string
}

export const ModalInput: VFC<Props> = memo((props) => {
  const { value, onChange, type } = props

  return (
    <Input
      _focus={{ boxShadow: 'none'}} 
      value={ value }
      onChange={ onChange }
      bg='white'
      type={ type }
    />
  )
})
