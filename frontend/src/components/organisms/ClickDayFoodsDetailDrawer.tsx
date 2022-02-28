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
  const [ foodsPrice, setFoodsPrice ] = useState<number | null>()
  const [ foodsCalorie, setFoodsCalorie ] = useState<number | null>()

  useEffect(() => {
    setFoodsPrice(foods ? foods.map(food => food.price || 0).reduce((a, b) => a + b, 0) : 0)
    setFoodsCalorie(foods ? foods.map(food => food.calorie || 0).reduce((a, b) => a + b, 0) : 0)
  }, [foods])

  const { pigImages } = usePigImages({ food: { calorie: foodsCalorie || 0 } })
  const { bgColor } = useBgColor({ food: { price: foodsPrice || 0} })

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
              { foodsCalorie ? <Center py={5}>{ pigImages }</Center> : "" }
              <Stack>
              <FormControl>
                <FormLabel>使った金額</FormLabel>
                <ReadOnlyInput value={ foodsPrice || 0 } />
              </FormControl>
              <FormControl>
                <FormLabel>摂取カロリー</FormLabel>
                <ReadOnlyInput value={ foodsCalorie || 0 } />
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
