import { memo, useCallback, FC, Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, TableCaption, Tbody } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { Food } from '../../types/Food'
import { FoodTr } from './FoodTr'

type Props = {
  foods?: Food[],
  onCloseDrawer: () => void,
  setFoods: Dispatch<SetStateAction<Food[]>>
}

export const FoodsDetailTable: FC<Props> = memo((props) => {
  const { foods, onCloseDrawer, setFoods } = props

  // 入力画面へ移動
  const navigate = useNavigate()
  const onClickAddFood = useCallback(() => navigate('/new'), [navigate])

  return (
    <Table variant='simple'>
      <TableCaption>
        <AddIcon onClick={ onClickAddFood } />
      </TableCaption>
      <Tbody p={0}>
        { foods?.map(food => (
          <FoodTr
            food={ food }
            key={ food.id }
            onCloseDrawer={ onCloseDrawer }
            setFoods={setFoods}
          />
        )) }
      </Tbody>
    </Table>
  )
})
