import { memo, VFC } from "react"
import { Box, Container, Flex, Image, Stack, Text } from "@chakra-ui/react"

import MainImage from "../../images/main-image.png"

export const TopImage: VFC = memo(() => {
  return (
    <Box bg="red.300" p={6}>
      <Container>
      <Flex justify="space-around" alignItems={{ base: "end", md: "center" }}>
        <Stack>
          <Text color="white">食費とカロリーの<br/>可視化サービス</Text>
          <Text fontSize={{ base: "2xl", md: "4xl" }} color="white" fontWeight="bold">「ミルミル」</Text>
          <Text fontSize={{ base: "sm", md: "2xl" }} className="balloon">
            <Text as="span" color="red.300" p={1}>脱</Text>
            無駄遣いしよう！
          </Text>
        </Stack>
        <Image src={ MainImage } boxSize={{ base: 140, md: 240 }} />
      </Flex>
      </Container>
    </Box>
  )
})
