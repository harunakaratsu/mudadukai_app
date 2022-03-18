import { useState, useEffect } from "react"

type Props = {
  food: {
    price: number
  },
  basePrice: number
}

export const useBgColor = (props: Props) => {
  const { food, basePrice } = props
  const [ bgColor, setBgColor ] = useState("white")

  useEffect(() => {
    setBgColor(
    food.price < basePrice ? "white" :
    ( food.price >= basePrice && food.price < basePrice*3 ) ? "red.50" :
    ( food.price >= basePrice*3 && food.price < basePrice*5 ) ? "red.100" :
    ( food.price >= basePrice*5 && food.price < basePrice*10 ) ? "red.300" : "red.500")
  }, [food.price, basePrice])

  return { bgColor }
}
