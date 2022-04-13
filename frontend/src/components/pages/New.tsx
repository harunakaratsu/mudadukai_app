import { memo, useCallback, useEffect, useState, VFC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import liff from '@line/liff/dist/lib'
import { Button, Center, Flex, FormControl, FormLabel, InputGroup, InputRightElement, Link, Stack, Switch, Text } from '@chakra-ui/react'

import { Suggest } from '../atoms/Suggest'
import { PigImage } from '../atoms/images/PigImage'
import { CreateInput } from '../atoms/inputs/CreateInput'
import { FoodDetailAccordion } from '../organisms/FoodDetailAccordion'
import { FavoritesMenu } from '../organisms/FavoritesMenu'
import { useMessage } from '../../hooks/useMessage'
import { Food } from '../../types/Food'
import { State } from '../../types/State'

export const New: VFC = memo(() => {
  const initialValue = {
    name: '',
    price: null,
    calorie: null,
    created_at: dayjs().format('YYYY-MM-DD'),
    place: '',
    memo: '',
    favorite: false,
    amount: null,
    unit: ''
  }
  const [ createFood, setCreateFood ] = useState<Omit<Food, 'id'>>(initialValue)
  const [ amountEaten, setAmountEaten ] = useState<number | null>()
  const { showMessage } = useMessage()

  // バーコードから読み取った場合
  const location = useLocation()
  const state = location.state as State
  useEffect(() => {
    if (state) {
      if (!state.name) {
        showMessage({ status: 'error', title: '名前の読み取りに失敗しました' })
        state.name = ''
      }
      if (!state.price) {
        showMessage({ status: 'error', title: '金額の読み取りに失敗しました' })
        state.price = null
      }
      if (!state.calorie) {
        showMessage({ status: 'error', title: 'カロリーの読み取りに失敗しました' })
        state.calorie = null
      }
      if (!state.amount || !state.unit) {
        showMessage({ status: 'error', title: '分量の読み取りに失敗しました' })
        state.amount = null
        state.unit = ''
      }
      setCreateFood({
        ...createFood,
        name: state.name,
        price: state.price,
        calorie: state.calorie,
        amount: state.amount,
        unit: state.unit
      })
      setAmountEaten(100)
    }
  }, [showMessage, state])

  const onChangePrice = useCallback((e) => setCreateFood({...createFood, price: e.target.value}), [createFood])
  const onChangeCalorie = useCallback((e) => setCreateFood({...createFood, calorie: e.target.value}), [createFood])
  const onChangeFavorite = useCallback((e) => setCreateFood({...createFood, favorite: e.target.checked}), [createFood])

  // 入力欄をリセットする
  const resetInput = () => {
    setCreateFood(initialValue)
    setAmountEaten(null)
  }

  // Foodを作成する
  const val = (amountEaten ?? 100) / 100
  const onClickCreateFood = () => {
    axios
      .post('/foods', {
        name: createFood.name,
        price: Math.round((createFood.price ?? 0) * val),
        calorie: Math.round((createFood.calorie ?? 0) * val),
        created_at: createFood.created_at,
        place: createFood.place,
        memo: createFood.memo,
        favorite: createFood.favorite,
        amount: Math.round((createFood.amount ?? 0) * val),
        unit: createFood.unit
      })
      .then(() => {
        showMessage({ status: 'success', title: '記録しました' })
        resetInput()
        liff.closeWindow()
      })
      .catch((e) => {
        showMessage({ status: 'error', title: '記録に失敗しました' })
        console.error(e)
      })
  }

  // カレンダーへ移動する
  const navigate = useNavigate()
  const onClickShowCalendar = useCallback(() => navigate('/'), [navigate])

  return (
    <Flex align='center' justify='center' height='100vh'>
      <Stack spacing={5}>
        <Text fontSize='lg' fontWeight='bold' textAlign='center' color='gray.600'>無駄遣いを記録</Text>

        <Center>
          <PigImage size={100} />
        </Center>

        <FormControl>
          <InputGroup>
            <Suggest createFood={ createFood } setCreateFood={ setCreateFood } />
            <InputRightElement width='3rem'>
              <FavoritesMenu createFood={ createFood } setCreateFood={ setCreateFood } />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <CreateInput value={ createFood.price || '' } onChange={ onChangePrice } placeholder='金額を入力' />
            <InputRightElement children='円' />
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <CreateInput value={ createFood.calorie || '' } onChange={ onChangeCalorie } placeholder='カロリーを入力' />
            <InputRightElement children='kcal' mr='2' />
          </InputGroup>
        </FormControl>

        <FoodDetailAccordion
          createFood={ createFood }
          setCreateFood={ setCreateFood }
          amountEaten={ amountEaten }
          setAmountEaten={ setAmountEaten }
        />

        <FormControl display='flex' alignItems='center' justifyContent='space-between'>
          <FormLabel htmlFor='favorite' mb='0' fontSize='sm' color='gray'>
            お気に入りに登録する
          </FormLabel>
          <Switch id='favorite' onChange={ onChangeFavorite } />
        </FormControl>

        <Button color='white' bg='red.300' onClick={ onClickCreateFood }>記録する</Button>

        <Center fontSize='sm' color='gray'>
          <Link onClick={ onClickShowCalendar }>カレンダーへ</Link>
        </Center>
      </Stack>
    </Flex>
  )
})
