import { BaseSyntheticEvent, Dispatch, memo, SetStateAction, useState, VFC } from 'react'
import Autosuggest from 'react-autosuggest'

import { useFoods } from '../../hooks/useFoods'
import { Food } from '../../type/Food'

type Props = {
  createFood: Omit<Food, 'id'>
  setCreateFood: Dispatch<SetStateAction<Omit<Food, 'id'>>>
}

export const Suggest: VFC<Props> = memo((props) => {
  const { createFood, setCreateFood } = props
  const [ suggestions, setSuggestions ] = useState<Food[]>([])
  const { foods } = useFoods()

  // カタカナをひらがなに変換する
  const kanaToHira = (str: string) => {
    return (
      str.replace(/[\u30A1-\u30FA]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    )
  }

  // 入力値に対するサジェストを取得する
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    if (inputLength) {
      const arr = foods.filter(food => (
        kanaToHira(food.name.toLowerCase()).slice(0, inputLength) === inputValue
      ))
      const result = arr.filter((food, index, self) => {
        // nameだけをリスト化する
        const nameList = self.map(food => food.name)
        // 重複を削除する
        if (nameList.indexOf(food.name) === index) {
          return food
        }
      })
      return result
    } else return []
  }

  // サジェストの結果を選んだ際にテキストボックスに表示されるテキスト
  const getSuggestionValue = (suggestion: Food) => {
    const { name, price, calorie } = suggestion
    createFood.price = price
    createFood.calorie = calorie
    return name
  }

  // サジェストを表示
  const renderSuggestion = (suggestion: Food) => {
    return (
      <div>{ suggestion.name }</div>
    )
  }

  // テキスト入力がある都度setStateで更新
  const onChange = (event: BaseSyntheticEvent, { newValue }: { newValue: string }) => {
    if (event) setCreateFood({ ...createFood, name: newValue })
  }

  // 入力したテキストに応じてサジェストの結果を絞り込む
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const suggestions: Food[] = getSuggestions(value)
    setSuggestions(suggestions)
  }

  // サジェストの結果をクリアする
  const onSuggestionsClearRequested = () => setSuggestions([])

  const inputProps = {
    placeholder: '名前を入力',
    value: createFood.name,
    onChange,
    width: '80%'
  }

  return (
    <Autosuggest
      suggestions={ suggestions }
      onSuggestionsFetchRequested={ onSuggestionsFetchRequested }
      onSuggestionsClearRequested={ onSuggestionsClearRequested }
      getSuggestionValue={ getSuggestionValue }
      renderSuggestion={ renderSuggestion }
      inputProps={ inputProps }
    />
  )
})
