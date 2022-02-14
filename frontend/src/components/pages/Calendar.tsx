import { memo, useCallback, useState, VFC } from "react"
import dayjs from "dayjs"
import { useDisclosure } from "@chakra-ui/react"

import FullCalendar, { EventClickArg } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import allLocales from '@fullcalendar/core/locales-all'

import { Food } from "../../type/Food"
import { useFoods } from "../../hooks/useFoods"
import { ClickDayFoodsDetailDrawer } from "../organisms/ClickDayFoodsDetailDrawer"

export const Calendar: VFC = memo(() => {
  const [ clickDayFoods, setClickDayFoods ] = useState<Array<Food>>()
  const [ clickDay, setClickDay ] = useState("")
  const { foods, setFoods } = useFoods()
  const { isOpen, onClose, onOpen } = useDisclosure()

  // 日を消す
  const dayCellContent = useCallback((e: any) => e.dayNumberText = e.dayNumberText.replace('日', ''), [])

  // イベントをクリック
  const onClickEvent = useCallback((arg: EventClickArg) => {
    setClickDayFoods(foods.filter(food => dayjs(food.created_at).format("YYYY-MM-DD") === dayjs(arg.event.startStr).format("YYYY-MM-DD")))
    onOpen()
  }, [onOpen, foods])

  // 日付をクリック
  const onClickDate = useCallback((arg: DateClickArg) => {
    setClickDayFoods(foods.filter(food => dayjs(food.created_at).format("YYYY-MM-DD") === arg.dateStr))
    setClickDay(dayjs(arg.dateStr).format("D"))
    onOpen()
  }, [onOpen, foods])

  return (
    <>
    <FullCalendar  plugins={[ dayGridPlugin, interactionPlugin ]} 
                    initialView="dayGridMonth"
                    locales={ allLocales }
                    locale="ja"
                    contentHeight="auto"
                    headerToolbar={{
                      left: "prev",
                      center: "title",
                      right: "next"
                    }}
                    dayCellContent={ dayCellContent }
                    eventDisplay="list-item"
                    events={ foods.map((food) => ({
                      title: food.name,
                      date: food.created_at
                    })) }
                    eventClick={ onClickEvent }
                    dateClick={ onClickDate }
                    />
    <ClickDayFoodsDetailDrawer isOpen={ isOpen } onCloseDrawer={ onClose } foods={ clickDayFoods } clickDay={ clickDay } setFoods={setFoods} />
    </>
  )
})