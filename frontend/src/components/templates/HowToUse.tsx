import { memo, VFC } from "react"
import { Box, Button, Center, Container, Flex, Heading, Image, Link } from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"

import Image12 from "../../images/image12.png"
import Image13 from "../../images/image13.png"
import Image14 from "../../images/image14.png"

export const HowToUse: VFC = memo(() => {
  return (
    <Box py={10} bg="red.50">
      <Container maxW='container.lg'>
        <Heading as="h1" size="lg" textAlign="center" py={10}>
          使い方
        </Heading>

        <Flex justify="space-around" wrap={{ base: "wrap", md: "nowrap" }}>
          <Box>
            <Heading as="h2" size="md" py={10} textAlign="center">1. 記録する</Heading>
            <Image src={ Image12 } />
          </Box>
          <Box>
            <Heading as="h2" size="md" py={10} textAlign="center">2. 記録を見る</Heading>
            <Image src={ Image13 } />
          </Box>
          <Box>
            <Heading as="h2" size="md" py={10} textAlign="center">3. 通知を受ける</Heading>
            <Image src={ Image14 } />
          </Box>
        </Flex>

        <Center py={10}>
          <Link href="/use">
            <Button bg="yellow.200" _hover={{ bg: "yellow.300" }} borderRadius={999} border="2px dashed #4A5568" px={10} py={8}>
              詳しい使い方を見る
              <ArrowRightIcon ml={5} />
            </Button>
          </Link>
        </Center>
      </Container>
    </Box>
  )
})
