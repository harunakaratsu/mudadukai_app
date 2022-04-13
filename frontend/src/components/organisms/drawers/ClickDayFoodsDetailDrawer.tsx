import { memo, useEffect, useState, VFC, Dispatch, SetStateAction } from 'react'
import { Drawer, DrawerBody, DrawerContent, FormControl, FormLabel, InputGroup, InputRightElement, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { Food } from '../../../types/Food'
import { usePigImages } from '../../../hooks/usePigImages'
import { useBgColor } from '../../../hooks/useBgColor'
import { FoodsDetailTable } from '../../molecules/FoodsDetailTable'
import { ReadOnlyInput } from '../../atoms/inputs/ReadOnluInput'

type Props = {
  isOpen: boolean,
  onCloseDrawer: () => void,
  foods?: Food[],
  clickDay: string,
  setFoods: Dispatch<SetStateAction<Food[]>>
}

export const ClickDayFoodsDetailDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onCloseDrawer, foods, clickDay, setFoods } = props
  const [ foodsPrice, setFoodsPrice ] = useState<number | null>()
  const [ foodsCalorie, setFoodsCalorie ] = useState<number | null>()

  const { pigImages } = usePigImages()
  const { bgColor } = useBgColor()

  useEffect(() => {
    setFoodsPrice(foods ? foods.map(food => food.price || 0).reduce((a, b) => a + b, 0) : 0)
    setFoodsCalorie(foods ? foods.map(food => food.calorie || 0).reduce((a, b) => a + b, 0) : 0)
  }, [foods])

  return (
    <Drawer placement='bottom' onClose={onCloseDrawer} isOpen={isOpen} size='md' autoFocus={false}>
      <DrawerContent h='50vh' bg={ bgColor({ food: { price: foodsPrice || 0 }, basePrice: 100 }) }>
        <DrawerBody p={0}>
        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab>{ `${ clickDay }日の記録` }</Tab>
            <Tab>詳細</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              { pigImages({ food: { calorie: foodsCalorie || 0 }, baseCalorie: 100 }) }
              <Stack>
                <FormControl>
                  <FormLabel>使った金額</FormLabel>
                  <InputGroup>
                    <ReadOnlyInput value={ foodsPrice || 0 } />
                    <InputRightElement children='円' />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>摂取カロリー</FormLabel>
                  <InputGroup>
                    <ReadOnlyInput value={ foodsCalorie || 0 } />
                    <InputRightElement children='kcal' mr='2' />
                  </InputGroup>
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
