import { memo, useCallback, VFC } from "react"
import liff from "@line/liff/dist/lib"
import { Stack, Text } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

export const Use: VFC = memo(() => {
  const onClickClose = useCallback(() => liff.closeWindow(), [])

  return (
    <Stack spacing={5} p={10}>
      <CloseIcon ml="auto" onClick={ onClickClose } />
      <Text fontSize='lg' fontWeight="bold" textAlign="center" pb={5}>使い方</Text>
      <Text>① メニューの「記録する」から無駄遣いしたものを記録します。</Text>
      <Text>② メニューの「記録を見る」で記録を確認できます。</Text>
      <Text>③「記録を見る」で表示されるカレンダーの日付をクリックすると、その日の無駄遣いの記録や詳細が確認できます。</Text>
      <Text>④ 間違って記録した場合は詳細から記録の編集や削除ができます。</Text>
      <Text>⑤ 1週間、1ヶ月ごとにその期間に無駄遣いした金額と摂取カロリーの合計値がメッセージで送信されます。</Text>
    </Stack>
  )
})
