import { memo, useCallback, VFC, Dispatch, SetStateAction } from 'react'
import { Td, Tr, useDisclosure } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import { Food } from '../../type/Food'
import { FoodDetailModal } from '../organisms/FoodDetailModal'

type Props = {
  food: Food,
  onCloseDrawer: () => void,
  setFoods: Dispatch<SetStateAction<Food[]>>
}

export const FoodTr: VFC<Props> = memo((props) => {
  const { food, onCloseDrawer, setFoods } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  // モーダルを開く
  const onClickOpenModal = useCallback(() => onOpen(), [onOpen])

  return (
    <Tr onClick={ onClickOpenModal }>
      <Td>{ food.name }</Td>
      <Td textAlign='right'>
        <ChevronRightIcon w={7} h={7} color='gray.600' />
        <FoodDetailModal
          onCloseDrawer={ onCloseDrawer }
          onClose={ onClose }
          isOpen={ isOpen }
          food={ food }
          setFoods={setFoods}
        />
      </Td>
    </Tr>
  )
})
