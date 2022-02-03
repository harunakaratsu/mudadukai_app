import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../components/pages/Login'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  )
}