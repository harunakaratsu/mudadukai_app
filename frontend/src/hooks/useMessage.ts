import { useCallback } from "react"
import { useToast } from "@chakra-ui/react"

type Props = {
  title: string
  status: "success" | "error"
}

export const useMessage = () => {
  const toast = useToast()

  const showMessage = useCallback((props: Props) => {
    const { title, status } = props

    toast({
      position: "top",
      duration: 3000,
      isClosable: true,
      title,
      status
    })
  }, [toast])

  return { showMessage }
}
