import { ChangeEvent, CSSProperties, memo, FC } from 'react'
import { Input } from '@chakra-ui/react'

type Props = {
  value: number | string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: string
  style?: CSSProperties
}

export const ModalInput: FC<Props> = memo((props) => {
  const { value, onChange, type, style } = props

  return (
    <Input
      _focus={{ boxShadow: 'none'}} 
      value={ value }
      onChange={ onChange }
      bg='white'
      type={ type }
      style={ style }
    />
  )
})
