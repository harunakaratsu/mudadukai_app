import { useCallback } from 'react'

type Props = {
  food: {
    price: number
  },
  basePrice: number
}

export const useBgColor = () => {
  const bgColor = useCallback((props: Props) => {
    const { food, basePrice } = props

    return (
      food.price < basePrice
      ? 'white' : food.price < basePrice * 3
      ? 'red.50' : food.price < basePrice * 5
      ? 'red.100' : food.price < basePrice * 10 
      ? 'red.300' : 'red.500'
    )
  }, [])

  return { bgColor }
}
