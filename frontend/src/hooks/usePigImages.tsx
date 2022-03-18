import { useState, useEffect } from "react"
import { WrapItem } from "@chakra-ui/react"

import { PigImage } from "../components/atoms/images/PigImage"
import { PigBlackImage } from "../components/atoms/images/PigBlackImage"

type Props = {
  food: {
    calorie: number
  },
  baseCalorie: number
}

export const usePigImages = (props: Props) => {
  const { food, baseCalorie } = props
  const [ pigImages, setPigImages ] = useState<any>()

  useEffect(() => {
    const pigCount = Math.floor(food.calorie / baseCalorie)
    setPigImages(
      pigCount < 10 ? 
      pigCount === 0 ? 
        <PigImage size={25} />
        : [...Array(pigCount)].map((pig, index) => <WrapItem key={index}><PigImage size={30} /></WrapItem>)
        : <PigBlackImage />
    )
  }, [food.calorie, baseCalorie])
  

  return { pigImages }
}
