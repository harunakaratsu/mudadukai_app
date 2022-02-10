import { useState, useEffect } from "react"
import { WrapItem } from "@chakra-ui/react"

import { PigImage } from "../components/atoms/images/PigImage"
import { PigBlackImage } from "../components/atoms/images/PigBlackImage"

type Props = {
  food: {
    calorie: number
  }
}

export const usePigImages = (props: Props) => {
  const { food } = props
  const [ pigImages, setPigImages ] = useState<any>()

  useEffect(() => {
    const pigCount = Math.floor(food.calorie / 100)
    setPigImages(
      pigCount < 10 ? 
      pigCount === 0 ? 
        <PigImage size={25} />
        : [...Array(pigCount)].map((pig, index) => <WrapItem key={index}><PigImage size={30} /></WrapItem>)
        : <PigBlackImage />
    )
  }, [food.calorie])
  

  return { pigImages }
}
