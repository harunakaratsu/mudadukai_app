import { memo, FC } from 'react'
import { Image } from '@chakra-ui/react'

type Props = { 
  size: number
}

export const PigImage: FC<Props> = memo((props) => {
  const { size } = props

  return (
    <Image 
      src='https://1.bp.blogspot.com/-41u0_S90Ppg/U8XkAkPE-gI/AAAAAAAAipE/hIYV_yYIwKA/s800/animal_pig_buta.png' 
      alt='豚の画像'
      boxSize={ size }
    />
  )
})
