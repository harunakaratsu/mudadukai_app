import { ChangeEvent, Dispatch, memo, SetStateAction, useState, VFC } from "react"
import axios from "axios"
import dayjs from "dayjs"
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react"

import { Food } from "../../type/Food"
import { usePigImages } from "../../hooks/usePigImages"
import { useBgColor } from "../../hooks/useBgColor"
import { useFoods } from "../../hooks/useFoods"
import { useMessage } from "../../hooks/useMessage"
import { ModalInput } from "../atoms/inputs/ModalInput"

type Props = {
  isOpen: boolean
  onClose: () => void
  onCloseDrawer: () => void
  food: Food
  setFoods: Dispatch<SetStateAction<Food[]>>
}

export const FoodDetailModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, food, onCloseDrawer, setFoods } = props
  const { foods } = useFoods()
  const { showMessage } = useMessage()

  const [ foodName, setFoodName ] = useState(food.name)
  const [ foodPrice, setFoodPrice ] = useState(food.price)
  const [ foodCalorie, setFoodCalorie ] = useState(food.calorie)
  const [ foodCreatedAt, setFoodCreatedAt ] = useState(food.created_at)

  const onChangeFoodName = (e: ChangeEvent<HTMLInputElement>) => setFoodName(e.target.value)
  const onChangeFoodPrice = (e: ChangeEvent<HTMLInputElement>) => setFoodPrice(Number(e.target.value))
  const onChangeFoodCalorie = (e: ChangeEvent<HTMLInputElement>) => setFoodCalorie(Number(e.target.value))
  const onChangeFoodCreatedAt = (e: ChangeEvent<HTMLInputElement>) => setFoodCreatedAt(e.target.value)

  const onClickUpdate = () => {
    axios.put(`/foods/${food.id}`, {
            name: foodName,
            price: foodPrice,
            calorie: foodCalorie,
            created_at: foodCreatedAt
         })
         .then((res) => {
           food.name = foodName
           food.price = foodPrice
           food.calorie = foodCalorie
           food.created_at = foodCreatedAt
           onCloseDrawer()
           showMessage({ status: "success", title: "記録を編集しました" })
        })
         .catch(e => {
           console.error(e)
           showMessage({ status: "error", title: "記録の編集に失敗しました" })
        })
  }

  const onClickDelete = () => {
    axios.delete(`/foods/${food.id}`)
          .then(() => {
            const newFoods = [...foods]
            newFoods.splice(foods.findIndex(f => f.id === food.id), 1)
            setFoods(newFoods)
            onCloseDrawer()
            showMessage({ status: "success", title: "記録を削除しました" })
          })
          .catch(e => console.error(e))
  }

  const { bgColor } = useBgColor({ food: { price: foodPrice } })
  const { pigImages } = usePigImages({ food: { calorie: foodCalorie } })

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} size="full">
      <ModalOverlay />
      <ModalContent bg={ bgColor }>
        <ModalHeader textAlign="center">
          <Input _focus={{ boxShadow: "none"}} 
                  style={{ border: "none", textAlign: "center", fontWeight: "bold" }} 
                  value={ foodName } 
                  onChange={ onChangeFoodName } />
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Center py={5}>{ pigImages }</Center>
          <Stack>
            <FormControl>
              <FormLabel>価格</FormLabel>
              <ModalInput value={ foodPrice } onChange={ onChangeFoodPrice } type="number" />
            </FormControl>
            <FormControl>
              <FormLabel>カロリー</FormLabel>
              <ModalInput value={ foodCalorie } onChange={ onChangeFoodCalorie } type="number" />
            </FormControl>
            <FormControl>
              <FormLabel>購入日時</FormLabel>
              <ModalInput value={ dayjs(foodCreatedAt).format("YYYY-MM-DD") } onChange={ onChangeFoodCreatedAt } type="date" />
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