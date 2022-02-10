import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Calendar } from "./components/pages/Calendar"
import { New } from "./components/pages/New"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Calendar /> } />
        <Route path="/new" element={ <New /> } />
      </Routes>
    </BrowserRouter>
  )
}
