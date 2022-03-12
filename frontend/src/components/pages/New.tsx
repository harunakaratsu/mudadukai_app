import { memo, useCallback, useEffect, useState, VFC } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import dayjs from "dayjs"
import liff from "@line/liff/dist/lib"
import { Button, Center, Flex, FormControl, FormLabel, InputGroup, InputRightElement, Link, Stack, Switch, Text } from "@chakra-ui/react"

import { FoodDetailAccordion } from "../organisms/FoodDetailAccordion"
import { FavoritesMenu } from "../organisms/FavoritesMenu"
import { Suggest } from "../organisms/Suggest"
import { useMessage } from "../../hooks/useMessage"
import { PigImage } from "../atoms/images/PigImage"
import { CreateInput } from "../atoms/inputs/CreateInput"
import { Food } from "../../type/Food"

export const New: VFC = memo(() => {
  const [ createFood, setCreateFood ] = useState<Omit<Food, "id">>({ name: "", price: null, calorie: null, created_at: dayjs().format("YYYY-MM-DD"), place: "", memo: "", favorite: false })
  const { showMessage } = useMessage()

  // バーコードから読み取った場合
  const location = useLocation()
  const state = location.state as { name: string, price: any, calorie: number | null }
  useEffect(() => {
    state && setCreateFood({ ...createFood, name: state.name, price: state.price, calorie: state.calorie })
    state && ( state.name || showMessage({ status: "error", title: "情報の読み取りに失敗しました" })  )
    state && ( state.price || showMessage({ status: "error", title: "金額の読み取りに失敗しました" })  )
    state && ( state.calorie || showMessage({ status: "error", title: "カロリーの読み取りに失敗しました" })  )
  }, [])

  const onChangePrice = useCallback((e) => setCreateFood({...createFood, price: e.target.value}), [createFood])
  const onChangeCalorie = useCallback((e) => setCreateFood({...createFood, calorie: e.target.value}), [createFood])
  const onChangeCreatedAt = useCallback((e) => setCreateFood({...createFood, created_at: e.target.value}), [createFood])
  const onChangePlace = useCallback((e) => setCreateFood({...createFood, place: e.target.value}), [createFood])
  const onChangeMemo = useCallback((e) => setCreateFood({...createFood, memo: e.target.value}), [createFood])
  const onChangeFavorite = useCallback((e) => setCreateFood({...createFood, favorite: e.target.checked}), [createFood])

  // 入力欄をリセットする
  const resetInput = () => {
    setCreateFood({ name: "", price: null, calorie: null, created_at: dayjs().format("YYYY-MM-DD"), place: "", memo: "", favorite: false })
  }

  // Foodを作成する
  const onClickCreateFood = () => {
    // ログインする
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID_NEW as string })
        .then(() => {
          // ログインしていなかったらログインする
          if (!liff.isLoggedIn()) {
            liff.login()
          }

          const idToken = liff.getIDToken()
          const params = new URLSearchParams()
          params.append("idToken", idToken as string)
          axios.post("/users", params)
              .then(res => {
                // IdTokenの有効期限が切れたらログアウトする
                if (res.data.error_description === 'IdToken expired.') {
                  liff.logout()
                }
              })
              .catch(e => console.error(e))
        })

    axios.post("/foods", {
            name: createFood.name,
            price: createFood.price,
            calorie: createFood.calorie,
            created_at: createFood.created_at,
            place: createFood.place,
            memo: createFood.memo,
            favorite: createFood.favorite
          })
          .then(() => {
            showMessage({ status: "success", title: "記録しました" })
            resetInput()
            liff.closeWindow()
          })
          .catch((e) => {
            showMessage({ status: "error", title: "記録に失敗しました" })
            console.error(e)
          })
  }

  // カレンダーへ移動する
  const navigate = useNavigate()
  const onClickShowCalendar = useCallback(() => navigate("/calendar"), [navigate])

  return (
    <Flex align="center" justify="center" height="100vh">
      <Stack spacing={5}>
        <Text fontSize='lg' fontWeight="bold" textAlign="center" color="gray.600">無駄遣いを記録</Text>

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
          <CreateInput value={ createFood.price || "" } onChange={ onChangePrice } placeholder="金額を入力" />
        </FormControl>

        <FormControl>
          <CreateInput value={ createFood.calorie || "" } onChange={ onChangeCalorie } placeholder="カロリーを入力" />
        </FormControl>

        <FoodDetailAccordion createFood={ createFood } onChangeCreatedAt={ onChangeCreatedAt } onChangePlace={ onChangePlace } onChangeMemo={ onChangeMemo } />

        <FormControl display='flex' alignItems='center' justifyContent="space-between">
          <FormLabel htmlFor='favorite' mb='0' fontSize="sm" color="gray">
            お気に入りに登録する
          </FormLabel>
          <Switch id='favorite' onChange={ onChangeFavorite } />
        </FormControl>

        <Button color="white" bg="red.300" onClick={ onClickCreateFood }>記録する</Button>

        <Center fontSize="sm" color="gray">
          <Link onClick={ onClickShowCalendar }>カレンダーへ</Link>
        </Center>
      </Stack>
    </Flex>
  )
})
