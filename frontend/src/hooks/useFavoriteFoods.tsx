import { useState, useEffect } from 'react'
import axios from 'axios'

import { Food } from '../types/Food'

export const useFavoriteFoods = () => {
  const [ favoriteFoods, setFavoriteFoods ] = useState<Food[]>([])

  useEffect(() => {
    axios
      .get('/foods/favorite_foods')
      .then(res => setFavoriteFoods(res.data))
      .catch(e => console.error(e))
  }, [])

  return { favoriteFoods, setFavoriteFoods }
}
