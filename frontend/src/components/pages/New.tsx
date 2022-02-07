import { memo, useCallback, useState, VFC } from "react"
import axios from "axios"
import { Button, Center, Flex, FormControl, Input, Stack, Text } from "@chakra-ui/react"

import { PigImage } from "../atoms/images/PigImage"

export const New: VFC = memo(() => {
  const [ createFood, setCreateFood ] = useState({ name: "", price: "", calorie: "" })

  const onChangeName = useCallback((e) => setCreateFood({...createFood, name: e.target.value}), [createFood])
  const onChangePrice = useCallback((e) => setCreateFood({...createFood, price: e.target.value}), [createFood])
  const onChangeCalorie = useCallback((e) => setCreateFood({...createFood, calorie: e.target.value}), [createFood])

  const resetInput = () => {
    setCreateFood({ name: "", price: "", calorie: "" })
  }

  const onClickCreateFood = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/foods`, {
            name: createFood.name,
            price: createFood.price,
            calorie: createFood.calorie
          })
          .then(() => {
            resetInput()
          })
          .catch((e) => {
            console.error(e)
          })
  }

  return (
    <Flex align="center" justify="center" height="100vh">
      <Stack spacing={5}>
        <Text fontSize='lg' fontWeight="bold" textAlign="center" color="gray.600">無駄遣いを記録</Text>

        <Center>
          <PigImage size={100} />
        </Center>

        <FormControl>
          <Input value={ createFood.name } onChange={ onChangeName } placeholder="名前を入力"  />
        </FormControl>

        <FormControl>
          <Input value={ createFood.price } onChange={ onChangePrice } placeholder="金額を入力" />
        </FormControl>

        <FormControl>
          <Input value={ createFood.calorie } onChange={ onChangeCalorie } placeholder="カロリーを入力" />
        </FormControl>

        <Button color="white" bg="red.300" onClick={ onClickCreateFood }>記録する</Button>
      </Stack>
    </Flex>
  )
})
