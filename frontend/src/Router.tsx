import { BrowserRouter, Routes, Route } from "react-router-dom"
import { New } from "./components/pages/New"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <New /> } />
      </Routes>
    </BrowserRouter>
  )
}
