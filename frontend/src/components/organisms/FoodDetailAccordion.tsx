import { ChangeEvent, memo, VFC } from "react"
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Stack, FormControl, Textarea } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from "@chakra-ui/icons"

import { CreateInput } from "../atoms/inputs/CreateInput"

type Props = {
  createFood: {
    created_at: string,
    place: string,
    memo: string
  }
  onChangeCreatedAt: (e: ChangeEvent<HTMLInputElement>) => void
  onChangePlace: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeMemo: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const FoodDetailAccordion: VFC<Props> = memo((props) => {
  const { createFood, onChangeCreatedAt, onChangePlace, onChangeMemo } = props

  return (
    <Accordion allowMultiple>
      <AccordionItem style={{ border: "none" }}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton _focus={{ boxShadow: "none"}} _hover={{ opacity: 1 }} p={0} mb={3} color="gray">
              <Box flex='1' textAlign='left'>
                詳細を記録
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='12px' />
              ) : (
                <AddIcon fontSize='12px' />
              )}
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <Stack spacing={5}>
              <FormControl>
                <CreateInput placeholder="購入場所を入力"
                             value={ createFood.created_at }
                             onChange={ onChangeCreatedAt }
                             type="date" />
              </FormControl>
              <FormControl>
                <CreateInput placeholder="購入場所を入力"
                             value={ createFood.place }
                             onChange={ onChangePlace } />
              </FormControl>
              <FormControl>
                <Textarea placeholder="メモを入力"
                          _focus={{ boxShadow: "none"}}
                          value={ createFood.memo }
                          onChange={ onChangeMemo }  />
              </FormControl>
            </Stack>
          </AccordionPanel>
        </>
      )}
      </AccordionItem>
    </Accordion>
  )
})
