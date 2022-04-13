import { useState, useEffect } from 'react'
import axios from 'axios'

import { Food } from '../types/Food'

export const useFoods = () => {
  const [ foods, setFoods ] = useState<Food[]>([])

  useEffect(() => {
    axios
      .get('/foods')
      .then(res => setFoods(res.data))
      .catch(e => console.error(e))
  }, [])

  return { foods, setFoods }
}
