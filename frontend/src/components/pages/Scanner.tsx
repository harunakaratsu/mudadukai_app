import { memo, useEffect, VFC } from 'react'
import { useNavigate } from 'react-router-dom'
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2'
import axios from 'axios'

export const Scanner: VFC = memo(() => {
  const navigate = useNavigate()

  const onDetected = (result: string | null) => {
    Quagga.stop()
    // 名前と金額を取得する
    axios.post('/search_name_and_price', { jan_code: result })
         .then((res) => {
           const name = res.data.name
           const price = res.data.price
           const amount = res.data.amount.replace(/[^0-9]/g, '')
           const unit = res.data.amount.replace(/[0-9]/g, '')

           // 入力画面に移動する
           navigate('/new', {
            state: {
              name: name,
              price: price,
              amount: amount,
              unit: unit
            } 
           })
         })
         .catch(e => console.error(e))
  }

  const detected = (result: QuaggaJSResultObject) => {
    onDetected(result.codeResult.code)
  }

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream'
      },
      locator: {
        halfSample: true
      },
      decoder: {
        readers: ['ean_reader'],
        multiple: false
      }
    }, (err) => {
      if (err) {
        console.log(err)
        return
      }
      Quagga.start()
    })
    Quagga.onDetected(detected)
  })

  return (
    <div id='interactive' className='viewport'  />
  )
})
