import { memo, VFC } from "react"

import { Header } from "../templates/Header"
import { TopImage } from "../templates/TopImage"
import { AddFriend } from "../templates/AddFriend"
import { HowToUse } from "../templates/HowToUse"
import { Footer } from "../templates/Footer"

export const Top: VFC = memo(() => {
  return (
    <>
      <Header />
      <TopImage />
      <AddFriend />
      <HowToUse />
      <Footer />
    </>
  )
})
