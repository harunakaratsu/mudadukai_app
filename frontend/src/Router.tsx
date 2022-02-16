import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Calendar } from "./components/pages/Calendar"
import { New } from "./components/pages/New"
import { Use } from "./components/pages/Use"

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Calendar /> } />
        <Route path="/new" element={ <New /> } />
        <Route path="/use" element={ <Use /> } />
      </Routes>
    </BrowserRouter>
  )
}
