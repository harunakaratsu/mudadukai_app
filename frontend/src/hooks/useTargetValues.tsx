import axios from 'axios'
import { useEffect, useState } from 'react'

import { TargetValue } from '../types/TargetValue'

export const useTargetValues = () => {
  const [ targetValues, setTargetValues ] = useState<TargetValue[]>([])

  useEffect(() => {
    axios
      .get('/target_values')
      .then(res => setTargetValues(res.data))
      .catch(e => console.error(e))
  }, [])

  return { targetValues, setTargetValues }
}
