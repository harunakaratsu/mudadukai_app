import { memo, FC } from 'react'
import { Button, Flex, FormControl, FormLabel, InputGroup, InputRightElement, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react'

import { ReadOnlyInput } from '../atoms/inputs/ReadOnluInput'
import { Chart } from './Chart'
import { TargetValueModal } from './modals/TargetValueModal'
import { usePigImages } from '../../hooks/usePigImages'
import { useBgColor } from '../../hooks/useBgColor'
import { useTargetValues } from '../../hooks/useTargetValues'

type Props = {
  currentYearMonthFoods: {
    price: number,
    calorie: number
  },
  currentYearMonth: string
}

export const MonthRecordCard: FC<Props> = memo((props) => {
  const { currentYearMonthFoods, currentYearMonth } = props

  // hooks
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { pigImages } = usePigImages()
  const { bgColor } = useBgColor()
  const { targetValues, setTargetValues } = useTargetValues()

  // 目標値を取得する
  const getTargetValue = targetValues.find(targetValue => (
    targetValue.year_month === currentYearMonth.replace(/[^0-9]/g, '')
  ))

  return (
    <Tabs isFitted variant='enclosed'>
      <TabList _focus={{ boxShadow: 'none'}}>
        <Tab>{ `${ currentYearMonth }の記録` }</Tab>
        <Tab>金額のグラフ</Tab>
        <Tab>カロリーのグラフ</Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          bg={ bgColor({ food: { price: currentYearMonthFoods.price }, basePrice: 1000 }) }
          height={400}
        >
          <Stack spacing={5} p={5}>
            { pigImages({ food: { calorie: currentYearMonthFoods.calorie }, baseCalorie: 1000 }) }
            <FormControl>
              <FormLabel>使った金額</FormLabel>
              <InputGroup>
                <ReadOnlyInput value={ currentYearMonthFoods.price } />
                <InputRightElement children='円' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>摂取カロリー</FormLabel>
              <InputGroup>
                <ReadOnlyInput value={ currentYearMonthFoods.calorie } />
                <InputRightElement children='kcal' mr='2' />
              </InputGroup>
            </FormControl>
          </Stack>
        </TabPanel>

        <TabPanel>
          <FormControl w='75%' m='auto'>
            <FormLabel>目標金額</FormLabel>
            <Flex>
              {
                getTargetValue?.price
                ? (
                  <InputGroup>
                    <ReadOnlyInput value={ getTargetValue.price }/>
                    <InputRightElement children='円' />
                  </InputGroup>
                )
                : <ReadOnlyInput value='未設定'/>
              }
              <Button ml={2} onClick={ onOpen }>設定</Button>
              <TargetValueModal
                isOpen={ isOpen }
                onClose={ onClose }
                currentYearMonth={ currentYearMonth }
                targetValues={ targetValues }
                setTargetValues={ setTargetValues }
              />
            </Flex>
          </FormControl>
          { getTargetValue &&
            <Chart
              targetValue={ (getTargetValue?.price || 0) - currentYearMonthFoods.price }
              currentValue={ currentYearMonthFoods.price }
              unit='円'
            />
          }
        </TabPanel>

        <TabPanel>
          <FormControl w='75%' m='auto'>
            <FormLabel>目標カロリー</FormLabel>
            <Flex>
              {
                getTargetValue?.calorie
                ? (
                  <InputGroup>
                    <ReadOnlyInput value={ getTargetValue.calorie }/>
                    <InputRightElement children='kcal' mr='2' />
                  </InputGroup>
                )
                : <ReadOnlyInput value='未設定'/>
              }
              <Button ml={2} onClick={ onOpen }>設定</Button>
              <TargetValueModal
                isOpen={ isOpen }
                onClose={ onClose }
                currentYearMonth={ currentYearMonth }
                targetValues={ targetValues }
                setTargetValues={ setTargetValues }
              />
            </Flex>
          </FormControl>
          { getTargetValue &&
            <Chart
              targetValue={ (getTargetValue?.calorie || 0) - currentYearMonthFoods.calorie }
              currentValue={ currentYearMonthFoods.calorie }
              unit='kcal'
            />
          }
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
})
