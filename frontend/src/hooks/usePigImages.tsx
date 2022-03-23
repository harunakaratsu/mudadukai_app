import { useCallback } from "react"
import { Center, WrapItem } from "@chakra-ui/react"

import { PigImage } from "../components/atoms/images/PigImage"
import { PigBlackImage } from "../components/atoms/images/PigBlackImage"

type Props = {
  food: {
    calorie: number
  },
  baseCalorie: number
}

export const usePigImages = () => {
  const pigImages = useCallback((props: Props) => {
    const { food, baseCalorie } = props
    const pigCount = Math.floor(food.calorie / baseCalorie)

    if (!food.calorie) return (<></>)
    if (pigCount < 10) {
      if (pigCount === 0) {
        return (
          <Center py={5}>
            <PigImage size={25} />
          </Center>
        )
      }
      return (
        <Center py={5}>
          { [...Array(pigCount)].map((pig, index) => (
            <WrapItem key={index}><PigImage size={30} /></WrapItem>
          )) }
        </Center>
      )
    } else {
      return (
        <Center py={5}>
          <PigBlackImage />
        </Center>
      )
    }
  }, [])

  return { pigImages }
}
