import { ChangeEvent, Dispatch, memo, SetStateAction, useState, VFC } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea } from '@chakra-ui/react'

import { Food } from '../../type/Food'
import { usePigImages } from '../../hooks/usePigImages'
import { useBgColor } from '../../hooks/useBgColor'
import { useFoods } from '../../hooks/useFoods'
import { useMessage } from '../../hooks/useMessage'
import { ModalInput } from '../atoms/inputs/ModalInput'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  onCloseDrawer: () => void,
  food: Food,
  setFoods: Dispatch<SetStateAction<Food[]>>
}

export const FoodDetailModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, food, onCloseDrawer, setFoods } = props
  const { foods } = useFoods()
  const { showMessage } = useMessage()
  const { bgColor } = useBgColor()
  const { pigImages } = usePigImages()

  const [ foodName, setFoodName ] = useState(food.name)
  const [ foodPrice, setFoodPrice ] = useState(food.price)
  const [ foodCalorie, setFoodCalorie ] = useState(food.calorie)
  const [ foodCreatedAt, setFoodCreatedAt ] = useState(food.created_at)
  const [ foodPlace, setFoodPlace ] = useState(food.place)
  const [ foodMemo, setFoodMemo ] = useState(food.memo)

  const onChangeFoodName = (e: ChangeEvent<HTMLInputElement>) => setFoodName(e.target.value)
  const onChangeFoodPrice = (e: ChangeEvent<HTMLInputElement>) => setFoodPrice(Number(e.target.value))
  const onChangeFoodCalorie = (e: ChangeEvent<HTMLInputElement>) => setFoodCalorie(Number(e.target.value))
  const onChangeFoodCreatedAt = (e: ChangeEvent<HTMLInputElement>) => setFoodCreatedAt(e.target.value)
  const onChangeFoodPlace = (e: ChangeEvent<HTMLInputElement>) => setFoodPlace(e.target.value)
  const onChangeFoodMemo = (e: ChangeEvent<HTMLTextAreaElement>) => setFoodMemo(e.target.value)

  // Foodを編集する
  const onClickUpdate = () => {
    axios
      .put(`/foods/${food.id}`, {
          name: foodName,
          price: foodPrice,
          calorie: foodCalorie,
          created_at: foodCreatedAt,
          place: foodPlace,
          memo: foodMemo
      })
      .then((res) => {
        const newFoods = [...foods]
        newFoods.splice(foods.findIndex(f => f.id === food.id), 1, res.data)
        setFoods(newFoods)
        onCloseDrawer()
        showMessage({ status: 'success', title: '記録を編集しました' })
      })
      .catch(e => {
        console.error(e)
        showMessage({ status: 'error', title: '記録の編集に失敗しました' })
      })
  }

  // Foodを削除する
  const onClickDelete = () => {
    axios
      .delete(`/foods/${food.id}`)
      .then(() => {
        const newFoods = [...foods]
        newFoods.splice(foods.findIndex(f => f.id === food.id), 1)
        setFoods(newFoods)
        onCloseDrawer()
        showMessage({ status: 'success', title: '記録を削除しました' })
      })
      .catch(e => console.error(e))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} size='sm'>
      <ModalOverlay />
      <ModalContent bg={ bgColor({ food: { price: foodPrice || 0 }, basePrice: 100 }) }>
        <ModalHeader textAlign='center'>
          <Input
            _focus={{ boxShadow: 'none'}} 
            style={{ border: 'none', textAlign: 'center', fontWeight: 'bold' }} 
            value={ foodName } 
            onChange={ onChangeFoodName }
          />
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          { pigImages({ food: { calorie: foodCalorie || 0 }, baseCalorie: 100 }) }
          <Stack>
            <FormControl>
              <FormLabel>価格</FormLabel>
              <InputGroup>
                <ModalInput value={ foodPrice || 0 } onChange={ onChangeFoodPrice } />
                <InputRightElement children='円' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>カロリー</FormLabel>
              <InputGroup>
                <ModalInput value={ foodCalorie || 0 } onChange={ onChangeFoodCalorie } />
                <InputRightElement children='kcal' mr='2' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>購入日時</FormLabel>
              <ModalInput value={ dayjs(foodCreatedAt).format('YYYY-MM-DD') } onChange={ onChangeFoodCreatedAt } type='date' />
            </FormControl>
            <FormControl>
              <FormLabel>購入場所</FormLabel>
              <ModalInput value={ foodPlace } onChange={ onChangeFoodPlace } />
            </FormControl>
            <FormControl>
              <FormLabel>メモ</FormLabel>
              <Textarea value={ foodMemo } onChange={ onChangeFoodMemo } bg='white' _focus={{ boxShadow: 'none'}} />
            </FormControl>

            <ModalFooter px={0} py={5}>
              <Button colorScheme='green' mr={3} onClick={ onClickUpdate }>保存</Button>
              <Button colorScheme='red' onClick={ onClickDelete } >削除</Button>
            </ModalFooter>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
