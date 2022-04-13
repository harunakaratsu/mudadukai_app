import { memo, useCallback, useEffect, useState, VFC } from 'react'
import dayjs from 'dayjs'
import { useDisclosure } from '@chakra-ui/react'

import FullCalendar, { DatesSetArg, EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all'

import { Food } from '../../types/Food'
import { useFoods } from '../../hooks/useFoods'
import { ClickDayFoodsDetailDrawer } from '../organisms/drawers/ClickDayFoodsDetailDrawer'
import { MonthRecordCard } from '../organisms/MonthRecordlCard'

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

  // 日を消す
  const dayCellContent = useCallback((e: any) => e.dayNumberText = e.dayNumberText.replace('日', ''), [])

  // イベントをクリック
  const onClickEvent = useCallback((arg: EventClickArg) => {
    setClickDayFoods(
      foods.filter(food => (
        dayjs(food.created_at).format('YYYY-MM-DD') === dayjs(arg.event.startStr).format('YYYY-MM-DD')
      ))
    )
    setClickDay(dayjs(arg.event.startStr).format('D'))
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

  // 表示されている年と月を取得する
  const dateSet = useCallback((arg: DatesSetArg) => {
    setCurrentYearMonth(
      dayjs(arg.view.currentStart).format('YYYY年MM月')
    )
  }, [])

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
      datesSet={ dateSet }
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
    <MonthRecordCard
      currentYearMonthFoods={ currentYearMonthFoods }
      currentYearMonth={ currentYearMonth }
    />
    </>
  )
})
