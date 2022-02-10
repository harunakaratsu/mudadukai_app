import { memo, useEffect, useState, VFC, Dispatch, SetStateAction } from "react"
import dayjs from "dayjs"
import { Center, Drawer, DrawerBody, DrawerContent, FormControl, FormLabel, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

import { Food } from "../../type/Food"
import { usePigImages } from "../../hooks/usePigImages"
import { useBgColor } from "../../hooks/useBgColor"
import { FoodsDetailTable } from "../molecules/FoodsDetailTable"
import { ReadOnlyInput } from "../atoms/inputs/ReadOnluInput"

type Props = {
  isOpen: boolean
  onCloseDrawer: () => void
  foods?: Array<Food>
  clickDay?: string
  setFoods: Dispatch<SetStateAction<Food[]>>
}

export const ClickDayFoodsDetailDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onCloseDrawer, foods, clickDay, setFoods } = props
  const [ foodsPrice, setFoodsPrice ] = useState(0)
  const [ foodsCalorie, setFoodsCalorie ] = useState(0)

  useEffect(() => {
    setFoodsPrice(foods ? foods.map(food => food.price).reduce((a, b) => a + b, 0) : 0)
    setFoodsCalorie(foods ? foods.map(food => food.calorie).reduce((a, b) => a + b, 0) : 0)
  }, [foods])

  const { pigImages } = usePigImages({ food: { calorie: foodsCalorie } })
  const { bgColor } = useBgColor({ food: { price: foodsPrice } })

  return (
    <Drawer placement='bottom' onClose={onCloseDrawer} isOpen={isOpen} size="md" autoFocus={false}>
      <DrawerContent h="50vh" bg={ bgColor }>
        <DrawerBody p={0}>
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab>{ foods && foods[0] ? `${ dayjs(foods[0].created_at).format("D") }日の記録` : `${ clickDay }日の記録` }</Tab>
            <Tab>詳細</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              { foodsCalorie > 0 && <Center py={5}>{ pigImages }</Center> }
              <Stack>
              <FormControl>
                <FormLabel>使った金額</FormLabel>
                <ReadOnlyInput value={ foodsPrice } />
              </FormControl>
              <FormControl>
                <FormLabel>摂取カロリー</FormLabel>
                <ReadOnlyInput value={ foodsCalorie } />
              </FormControl>
              </Stack>
            </TabPanel>

            <TabPanel p={0}>
              <FoodsDetailTable foods={ foods } onCloseDrawer={ onCloseDrawer } setFoods={setFoods} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
})
