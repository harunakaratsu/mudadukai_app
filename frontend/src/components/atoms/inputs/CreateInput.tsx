import { ChangeEvent, CSSProperties, memo, VFC } from 'react'
import { Input } from '@chakra-ui/react'

type Props = {
  value: string | number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  type?: string,
  style?: CSSProperties
}

export const CreateInput: VFC<Props> = memo((props) => {
  const { value, onChange, placeholder, type, style } = props

  return (
    <Input 
      _focus={{ boxShadow: 'none'}} 
      value={ value } 
      onChange={ onChange }
      placeholder={ placeholder }
      type={ type }
      style={ style }
    />
  )
})
