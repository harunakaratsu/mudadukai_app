import { memo, VFC } from "react"
import { Box, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"

import Image01 from "../../images/image01.png"
import Image02 from "../../images/image02.png"
import Image03 from "../../images/image03.png"
import Image04 from "../../images/image04.png"
import Image05 from "../../images/image05.png"
import Image06 from "../../images/image06.png"
import Image07 from "../../images/image07.png"
import Image08 from "../../images/image08.png"
import Image09 from "../../images/image09.png"
import Image10 from "../../images/image10.png"
import Image11 from "../../images/image11.png"

export const Use: VFC = memo(() => {
  return (
    <>
      <Heading as="h1" size="lg" textAlign="center" py={10}>
        使い方
      </Heading>

      <Stack spacing={100}>
        <Box>
          <Container>
            <Heading as='h4' size='md' mb={5}>
              1. 記録する
            </Heading>
            <Stack spacing={5}>
              <Flex justify="space-between">
                <Text width="50%">メニューの「記録する」をクリック</Text>
                <Image src={ Image01 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">入力画面が開くので無駄遣いした食べ物の名前と金額、カロリーを入力して「記録する」をクリックすると記録が完了します。</Text>
                <Image src={ Image03 } boxSize="45%" boxShadow="md" />
              </Flex>
            </Stack>
          </Container>
        </Box>

        <Box>
          <Container>
            <Heading as='h4' size='md' mb={5}>
              2. 記録を見る
            </Heading>
            <Stack spacing={20}>
              <Flex justify="space-between">
                <Text width="50%">メニューの「記録を見る」をクリック</Text>
                <Image src={ Image02 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">カレンダー画面が開き、記録した食べ物の名前が一覧で表示されます。</Text>
                <Image src={ Image04 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">確認したい日付をクリック</Text>
                <Image src={ Image05 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">
                  クリックした日付に無駄遣いした食べ物の金額とカロリーの合計が表示されます。<br />
                  無駄遣いした金額が高くなるほど背景が赤くなり、摂取カロリーが多くなるほど豚のイラストが増えていきます。
                </Text>
                <Image src={ Image10 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">メニューの「記録を見る」をクリック</Text>
                <Image src={ Image06 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">クリックした日付に無駄遣いした食べ物の名前が一覧で表示されます。</Text>
                <Image src={ Image07 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">詳細が見たい食べ物をクリック</Text>
                <Image src={ Image08 } boxSize="45%" />
              </Flex>
              <Flex justify="space-between">
                <Text width="50%">クリックした食べ物の詳細が表示されます。<br/>間違って記録した場合は、下のボタンから記録の編集や削除ができます。</Text>
                <Image src={ Image09 } boxSize="45%" />
              </Flex>
            </Stack>
          </Container>
        </Box>

        <Box>
          <Container>
            <Heading as='h4' size='md' mb={2}>
              3. 通知
            </Heading>
            <Flex justify="space-between">
              <Text pt={3} width="50%">毎週月曜日と毎月1日の9:00にその期間に無駄遣いした金額と摂取カロリーの合計値がメッセージで通知されます。</Text>
              <Image src={ Image11 } boxSize="45%" />
            </Flex>
          </Container>
        </Box>
      </Stack>
    </>
  )
})
