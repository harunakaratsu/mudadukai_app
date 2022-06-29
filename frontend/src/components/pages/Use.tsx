import { memo, VFC } from 'react'
import { Link as Scroll } from 'react-scroll'
import { Box, Container, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'

import { UseTitle } from '../atoms/UseTitle'

import Image01 from '../../images/image01.png'
import Image02 from '../../images/image02.png'
import Image03 from '../../images/image03.png'
import Image04 from '../../images/image04.png'
import Image05 from '../../images/image05.png'
import Image06 from '../../images/image06.png'
import Image07 from '../../images/image07.png'
import Image08 from '../../images/image08.png'
import Image09 from '../../images/image09.png'
import Image10 from '../../images/image10.png'
import Image15 from '../../images/image15.png'
import Image16 from '../../images/image16.png'
import Image17 from '../../images/image17.png'
import Image18 from '../../images/image18.png'
import Image19 from '../../images/image19.png'
import Image20 from '../../images/image20.png'
import Image23 from '../../images/image23.png'
import Image24 from '../../images/image24.png'
import Image25 from '../../images/image25.png'
import Image26 from '../../images/image26.png'
import Image27 from '../../images/image27.png'
import Image28 from '../../images/image28.png'

export const Use: VFC = memo(() => {
  return (
    <>
      <Heading as='h1' size='lg' textAlign='center' py={10}>
        使い方
      </Heading>

      <Stack spacing={100}>
        <Box>
          <Container style={{ border: '3px dotted gray', padding: '30px' }}>
            <Heading as='h4' size='md' mb={5} textAlign='center' className='use-title'>
              目次
            </Heading>
            <Stack spacing={5}>
              <Scroll to='1'>
                <Link>1. 記録する</Link>
              </Scroll>
              <Scroll to='2'>
                <Link>2. バーコードを読み取って記録する</Link>
              </Scroll>
              <Scroll to='3'>
                <Link>3. お気に入り登録する</Link>
              </Scroll>
              <Scroll to='4'>
                <Link>4. 記録を見る</Link>
              </Scroll>
              <Scroll to='5'>
                <Link>5. 通知を受ける</Link>
              </Scroll>
            </Stack>
          </Container>
        </Box>

        <Box id='1'>
          <Container>
            <UseTitle>1. 記録する</UseTitle>
            <Stack spacing={5}>
              <Flex justify='space-between'>
                <Text width='50%'>メニューの「記録する」をクリック</Text>
                <Image src={ Image01 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>入力画面が開くので無駄遣いした食べ物の名前と金額、カロリーを入力して「記録する」をクリックすると記録が完了します。</Text>
                <Image src={ Image03 } boxSize='45%' boxShadow='md' />
              </Flex>
            </Stack>
          </Container>
        </Box>

        <Box id='2'>
          <Container>
            <UseTitle>2. バーコードを読み取って記録する</UseTitle>
            <Stack spacing={5}>
              <Flex justify='space-between'>
                <Text width='50%'>
                  メニューの「バーコードから読み取る」をクリック<br />
                  カメラが起動するので食品のバーコードをスキャンします。<br />
                  該当する食品が読み込めた場合、名前と金額、カロリーが自動で入力されます。
                </Text>
                <Image src={ Image02 } boxSize='45%' />
              </Flex>
            </Stack>
          </Container>
        </Box>

        <Box id='3'>
          <Container>
            <UseTitle>3. お気に入り登録する</UseTitle>
            <Stack spacing={10}>
              <Flex justify='space-between'>
                <Text width='50%'>それぞれの項目を埋めて、お気に入りに登録するのタブをクリック</Text>
                <Image src={ Image16 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>名前を入力のフォームの右の三本線のアイコンをクリック</Text>
                <Image src={ Image17 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>お気に入りに登録した食品が一覧で表示されます。</Text>
                <Image src={ Image18 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>お気に入り一覧から記録したい食品をクリックすると名前と金額、カロリーが自動で入力されます。</Text>
                <Image src={ Image19 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>お気に入り一覧から削除したい食品の右にあるバツ印をクリックすると、お気に入りから削除できます。</Text>
                <Image src={ Image20 } boxSize='45%' boxShadow='md' />
              </Flex>
            </Stack>
          </Container>
        </Box>

        <Box id='4'>
          <Container>
            <UseTitle>4. 記録を見る</UseTitle>
            <Stack spacing={20}>
              <Flex justify='space-between'>
                <Text width='50%'>メニューの「記録を見る」をクリック</Text>
                <Image src={ Image15 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>カレンダー画面が開き、記録した食べ物の名前が一覧で表示されます。</Text>
                <Image src={ Image04 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>確認したい日付をクリック</Text>
                <Image src={ Image05 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>
                  クリックした日付に無駄遣いした食べ物の金額とカロリーの合計が表示されます。<br />
                  無駄遣いした金額が高くなるほど背景が赤くなり、摂取カロリーが多くなるほど豚のイラストが増えていきます。
                </Text>
                <Image src={ Image10 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>メニューの「記録を見る」をクリック</Text>
                <Image src={ Image06 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>クリックした日付に無駄遣いした食べ物の名前が一覧で表示されます。</Text>
                <Image src={ Image07 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>詳細が見たい食べ物をクリック</Text>
                <Image src={ Image08 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>クリックした食べ物の詳細が表示されます。<br/>間違って記録した場合は、下のボタンから記録の編集や削除ができます。</Text>
                <Image src={ Image09 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>カレンダーページを下にスクロールすると、今月の使った金額と摂取カロリーの合計が表示されます。</Text>
                <Image src={ Image28 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>グラフのタブをクリックすると、目標値を設定できます。<br/>設定をクリック。</Text>
                <Image src={ Image24 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>目標金額と目標カロリーを設定できます。<br/>金額とカロリーを設定したら、設定するをクリック。</Text>
                <Image src={ Image25 } boxSize='45%' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>目標値と今月の無駄遣いのグラフが表示されます。<br/>目標値からあとどのくらいの金額やカロリーを摂取できるかを確認できます。</Text>
                <Image src={ Image26 } boxSize='45%' boxShadow='md' />
              </Flex>
              <Flex justify='space-between'>
                <Text width='50%'>目標値の設定ボタンから目標値の編集と削除ができます。</Text>
                <Image src={ Image27 } boxSize='45%' />
              </Flex>
            </Stack>
          </Container>
        </Box>

        <Box id='5'>
          <Container>
            <UseTitle>5. 通知</UseTitle>
            <Flex justify='space-between'>
              <Text pt={3} width='50%'>無駄遣いが目標値の80%を超えた時と100%を超えた時にメッセージで警告の通知がされます。<br/>目標値が未設定の場合は通知されません。</Text>
              <Image src={ Image23 } boxSize='45%' />
            </Flex>
          </Container>
        </Box>
      </Stack>
    </>
  )
})
