import { ChangeEvent, Dispatch, memo, SetStateAction, useEffect, useState, FC } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, FormControl, FormLabel, Stack, InputGroup, InputRightElement } from '@chakra-ui/react'

import { ModalInput } from '../../atoms/inputs/ModalInput'
import { useMessage } from '../../../hooks/useMessage'
import { TargetValue } from '../../../types/TargetValue'

type Props = {
  isOpen: boolean,
  onClose: () => void,
  currentYearMonth: string,
  targetValues: TargetValue[],
  setTargetValues: Dispatch<SetStateAction<TargetValue[]>>
}

export const TargetValueModal: FC<Props> = memo((props) => {
  const { isOpen, onClose, currentYearMonth, targetValues, setTargetValues } = props
  const { showMessage } = useMessage()

  const initialValue = {
    id: 0,
    price: 0,
    calorie: 0,
    year_month: ''
  }

  // useState
  const [ targetValue, setTargetValue ] = useState<TargetValue>(initialValue)
  const [ targetPrice, setTargetPrice ] = useState(0)
  const [ targetCalorie, setTargetCalorie ] = useState(0)

  useEffect(() => {
    setTargetPrice(targetValue.price)
    setTargetCalorie(targetValue.calorie)
  }, [targetValue])

  // onChange
  const onChangeTargetPrice = (e: ChangeEvent<HTMLInputElement>) => setTargetPrice(Number(e.target.value))
  const onChangeTargetCalorie = (e: ChangeEvent<HTMLInputElement>) => setTargetCalorie(Number(e.target.value))

  // 目標値を取得する
  const getTargetValue = targetValues.find(targetValue => (
    targetValue.year_month === currentYearMonth.replace(/[^0-9]/g, '')
  ))

  useEffect(() => {
    setTargetValue(getTargetValue || initialValue)
  }, [getTargetValue])

  // 目標値を設定する
  const onClickCreate = () => {
    axios
      .post('/target_values', {
        price: targetPrice,
        calorie: targetCalorie,
        year_month: currentYearMonth.replace(/[^0-9]/g, '')
      })
      .then(res => {
        const newTargetValues = [...targetValues]
        newTargetValues.splice(targetValues.findIndex(t => t.id === targetValue.id), 1, res.data)
        setTargetValues(newTargetValues)
        showMessage({ status: 'success', title: '目標値を設定しました' })
        onClose()
      })
      .catch(e => console.error(e))
  }

  // 目標値を変更する
  const onClickUpdate = () => {
    axios
      .put(`/target_values/${targetValue.id}`, {
        price: targetPrice,
        calorie: targetCalorie
      })
      .then((res) => {
        const newTargetValues = [...targetValues]
        newTargetValues.splice(targetValues.findIndex(t => t.id === targetValue.id), 1, res.data)
        setTargetValues(newTargetValues)
        showMessage({ status: 'success', title: '目標値を変更しました' })
        onClose()
      })
      .catch(e => console.error(e))
  }

  // 目標値を削除する
  const onClickDelete = () => {
    axios
      .delete(`/target_values/${targetValue.id}`)
      .then((res) => {
        const newTargetValues = [...targetValues]
        newTargetValues.splice(targetValues.findIndex(t => t.id === targetValue.id), 1)
        setTargetValues(newTargetValues)
        showMessage({ status: 'success', title: '目標値を削除しました' })
        onClose()
      })
      .catch(e => console.error(e))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xs' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>目標値を設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <FormControl>
              <FormLabel>目標金額</FormLabel>
              <InputGroup>
                <ModalInput
                  value={ targetPrice }
                  onChange={ onChangeTargetPrice }
                />
                <InputRightElement children='円' />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>目標カロリー</FormLabel>
              <InputGroup>
                <ModalInput
                  value={ targetCalorie }
                  onChange={ onChangeTargetCalorie }
                />
                <InputRightElement children='kcal' mr={2} />
              </InputGroup>
            </FormControl>

            <ModalFooter px={0} mx={0}>
              {
                targetValue.id === 0
                ? <Button colorScheme='green' onClick={ onClickCreate }>設定する</Button>
                : (
                  <>
                    <Button colorScheme='green' mr={3} onClick={ onClickUpdate }>変更</Button>
                    <Button colorScheme='red' onClick={ onClickDelete } >削除</Button>
                  </>
                )
              }
            </ModalFooter>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})
