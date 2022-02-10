import { useState, useEffect } from "react"

type Props = {
  food: {
    price: number
  }
}

export const useBgColor = (props: Props) => {
  const { food } = props
  const [ bgColor, setBgColor ] = useState("white")

  useEffect(() => {
    setBgColor(
    food.price < 100 ? "white" :
    ( food.price >= 100 && food.price < 300 ) ? "red.50" :
    ( food.price >= 300 && food.price < 500 ) ? "red.100" :
    ( food.price >= 500 && food.price < 1000 ) ? "red.300" : "red.500")
  }, [food.price])
  

  return { bgColor }
}
