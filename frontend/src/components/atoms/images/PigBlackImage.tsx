import { memo, VFC } from "react"
import { Image } from "@chakra-ui/react"

export const PigBlackImage: VFC = memo(() => {
  return (
    <Image src="https://4.bp.blogspot.com/-O1h4L5OvP3U/VWmAawuYD6I/AAAAAAAAtwg/H6lorRZqmjg/s800/animal_kurobuta_pig.png" 
           alt="黒豚の画像"
           boxSize={50} />
  )
})
