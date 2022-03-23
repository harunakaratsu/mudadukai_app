import { memo, useCallback, useEffect, useState, VFC } from 'react'
import dayjs from 'dayjs'
import { Box, FormControl, FormLabel, Heading, InputGroup, InputRightElement, Stack, useDisclosure } from '@chakra-ui/react'

import FullCalendar, { DatesSetArg, EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all'

import { Food } from '../../type/Food'
import { useFoods } from '../../hooks/useFoods'
import { usePigImages } from '../../hooks/usePigImages'
import { useBgColor } from '../../hooks/useBgColor'
import { ClickDayFoodsDetailDrawer } from '../organisms/ClickDayFoodsDetailDrawer'
import { ReadOnlyInput } from '../atoms/inputs/ReadOnluInput'

export const Calendar: VFC = memo(() => {
  const [ clickDayFoods, setClickDayFoods ] = useState<Food[]>()
  const [ clickDay, setClickDay ] = useState('')
  const [ currentYearMonth, setCurrentYearMonth ] = useState('')
  const [ currentYearMonthFoods, setCurrentYearMonthFoods ] = useState({ price: 0, calorie: 0 })

  const { foods, setFoods } = useFoods()
  const { isOpen, onClose, onOpen } = useDisclosure()

  // 月ごとの記録の背景と豚のイラスト
  useEffect(() => {
    const currentFoods = foods.filter(food => dayjs(food.created_at).format('YYYY年MM月') === currentYearMonth)
    setCurrentYearMonthFoods({
      price: currentFoods.map(food => food.price || 0).reduce((a, b) => a + b, 0),
      calorie: currentFoods.map(food => food.calorie || 0).reduce((a, b) => a + b, 0)
    })
  }, [currentYearMonth, foods])

  const { pigImages } = usePigImages()
  const { bgColor } = useBgColor()

  // 日を消す
  const dayCellContent = useCallback((e: any) => e.dayNumberText = e.dayNumberText.replace('日', ''), [])

  // イベントをクリック
  const onClickEvent = useCallback((arg: EventClickArg) => {
    setClickDayFoods(
      foods.filter(food => (
        dayjs(food.created_at).format('YYYY-MM-DD') === dayjs(arg.event.startStr).format('YYYY-MM-DD')
      ))
    )
    setClickDay(dayjs(foods[0].created_at).format('D'))
    onOpen()
  }, [onOpen, foods])

  // 日付をクリック
  const onClickDate = useCallback((arg: DateClickArg) => {
    setClickDayFoods(
      foods.filter(food => dayjs(food.created_at).format('YYYY-MM-DD') === arg.dateStr)
    )
    setClickDay(dayjs(arg.dateStr).format('D'))
    onOpen()
  }, [onOpen, foods])

  return (
    <>
    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]} 
      initialView='dayGridMonth'
      locales={ allLocales }
      locale='ja'
      contentHeight='auto'
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next'
      }}
      dayCellContent={ dayCellContent }
      eventDisplay='list-item'
      events={ foods.map(food => ({
        title: food.name,
        date: food.created_at
      })) }
      eventClick={ onClickEvent }
      dateClick={ onClickDate }
      datesSet={(arg: DatesSetArg) => {
        setCurrentYearMonth(
          dayjs(arg.view.activeStart).add(1, 'month').format('YYYY年MM月')
        )
      }}
    />

    {/* ドロワー */}
    <ClickDayFoodsDetailDrawer
      isOpen={ isOpen }
      onCloseDrawer={ onClose }
      foods={ clickDayFoods }
      clickDay={ clickDay }
      setFoods={ setFoods }
    />

    {/* 月ごとの記録 */}
    <Box
      m={5}
      px={5}
      py={10}
      boxShadow='lg'
      borderRadius={10}
      bg={ bgColor({ food: { price: currentYearMonthFoods.price }, basePrice: 1000 }) }
    >
      <Stack spacing={5}>
        <Heading as='h4' size='md' textAlign='center' pb={5}>
          { currentYearMonth }の記録
        </Heading>

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
    </Box>
    </>
  )
})
