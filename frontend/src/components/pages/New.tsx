import { memo, useCallback, useState, VFC } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"
import { Button, Center, Flex, FormControl, Input, Link, Stack, Text } from "@chakra-ui/react"

import { useMessage } from "../../hooks/useMessage"
import { PigImage } from "../atoms/images/PigImage"
import { CreateInput } from "../atoms/inputs/CreateInput"

export const New: VFC = memo(() => {
  const [ createFood, setCreateFood ] = useState({ name: "", price: "", calorie: "", created_at: dayjs().format("YYYY-MM-DD") })
  const { showMessage } = useMessage()

  const onChangeName = useCallback((e) => setCreateFood({...createFood, name: e.target.value}), [createFood])
  const onChangePrice = useCallback((e) => setCreateFood({...createFood, price: e.target.value}), [createFood])
  const onChangeCalorie = useCallback((e) => setCreateFood({...createFood, calorie: e.target.value}), [createFood])
  const onChangeCreatedAt = useCallback((e) => setCreateFood({...createFood, created_at: e.target.value}), [createFood])

  const resetInput = () => {
    setCreateFood({ name: "", price: "", calorie: "", created_at: dayjs().format("YYYY-MM-DD") })
  }

  const onClickCreateFood = () => {
    axios.post("/foods", {
            name: createFood.name,
            price: createFood.price,
            calorie: createFood.calorie,
            created_at: createFood.created_at
          })
          .then(() => {
            showMessage({ status: "success", title: "記録しました" })
            resetInput()
          })
          .catch((e) => {
            showMessage({ status: "error", title: "記録に失敗しました" })
            console.error(e)
          })
  }

  const navigate = useNavigate()
  const onClickShowCalendar = useCallback(() => navigate("/"), [navigate])

  return (
    <Flex align="center" justify="center" height="100vh">
      <Stack spacing={5}>
        <Text fontSize='lg' fontWeight="bold" textAlign="center" color="gray.600">無駄遣いを記録</Text>

        <Center>
          <PigImage size={100} />
        </Center>

        <FormControl>
          <CreateInput value={ createFood.name } onChange={ onChangeName } placeholder="名前を入力"  />
        </FormControl>

        <FormControl>
          <CreateInput value={ createFood.price } onChange={ onChangePrice } placeholder="金額を入力" />
        </FormControl>

        <FormControl>
          <CreateInput value={ createFood.calorie } onChange={ onChangeCalorie } placeholder="カロリーを入力" />
        </FormControl>

        <FormControl>
          <Input type="date" _focus={{ boxShadow: "none"}} value={ createFood.created_at } onChange={ onChangeCreatedAt } color="gray.600"  />
        </FormControl>

        <Button color="white" bg="red.300" onClick={ onClickCreateFood }>記録する</Button>

        <Center fontSize="sm" color="gray">
          <Link onClick={ onClickShowCalendar }>カレンダーへ</Link>
        </Center>
      </Stack>
    </Flex>
  )
})
