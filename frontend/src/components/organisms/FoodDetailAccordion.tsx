import { Dispatch, memo, SetStateAction, useCallback, VFC } from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Stack, FormControl, Textarea, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

import { CreateInput } from '../atoms/inputs/CreateInput'
import { Food } from '../../type/Food'

type Props = {
  createFood: Omit<Food, "id">,
  setCreateFood: Dispatch<SetStateAction<Omit<Food, "id">>>,
  amountEaten: number | null | undefined,
  setAmountEaten: Dispatch<SetStateAction<number | null | undefined>>
}

export const FoodDetailAccordion: VFC<Props> = memo((props) => {
  const { createFood, setCreateFood, amountEaten, setAmountEaten } = props

  const onChangeCreatedAt = useCallback((e) => setCreateFood({...createFood, created_at: e.target.value}), [createFood, setCreateFood])
  const onChangePlace = useCallback((e) => setCreateFood({...createFood, place: e.target.value}), [createFood, setCreateFood])
  const onChangeMemo = useCallback((e) => setCreateFood({...createFood, memo: e.target.value}), [createFood, setCreateFood])
  const onChangeAmount = useCallback((e) => setCreateFood({...createFood, amount: e.target.value}), [createFood, setCreateFood])
  const onChangeUnit = useCallback((e) => setCreateFood({...createFood, unit: e.target.value}), [createFood, setCreateFood])
  const onChangeAmountEaten = useCallback((e) => setAmountEaten(e.target.value), [setAmountEaten])

  return (
    <Accordion allowMultiple>
      <AccordionItem style={{ border: 'none' }}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton _focus={{ boxShadow: 'none'}} _hover={{ opacity: 1 }} p={0} mb={3} color='gray'>
              <Box flex='1' textAlign='left'>
                詳細を記録
              </Box>
              { isExpanded ? (
                <MinusIcon fontSize='12px' />
              ) : (
                <AddIcon fontSize='12px' />
              ) }
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <Stack spacing={5}>
              <FormControl>
                <InputGroup>
                  <CreateInput
                    value={ createFood.amount || '' }
                    onChange={ onChangeAmount }
                    placeholder='分量を入力'
                  />
                  <InputRightElement width='4em'>
                    <CreateInput
                      value={ createFood.unit }
                      onChange={ onChangeUnit }
                      placeholder='単量'
                      style={{ textAlign: 'center' }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <CreateInput
                    value={ amountEaten || '' }
                    onChange={ onChangeAmountEaten }
                    placeholder='食べた量を入力'
                  />
                  <InputRightElement children='%' mr='2' />
                </InputGroup>
              </FormControl>

              <FormControl>
                <CreateInput
                  placeholder='購入日時を入力'
                  value={ createFood.created_at }
                  onChange={ onChangeCreatedAt }
                  type='date'
                />
              </FormControl>

              <FormControl>
                <CreateInput 
                  placeholder='購入場所を入力'
                  value={ createFood.place }
                  onChange={ onChangePlace }
                />
              </FormControl>

              <FormControl>
                <Textarea 
                  placeholder='メモを入力'
                  _focus={{ boxShadow: 'none'}}
                  value={ createFood.memo }
                  onChange={ onChangeMemo }
                />
              </FormControl>
            </Stack>
          </AccordionPanel>
        </>
      )}
      </AccordionItem>
    </Accordion>
  )
})
