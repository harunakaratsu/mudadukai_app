import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Top } from './components/pages/Top'
import { Calendar } from './components/pages/Calendar'
import { New } from './components/pages/New'
import { Scanner } from './components/pages/Scanner'
import { Use } from './components/pages/Use'
import { Terms } from './components/pages/Terms'
import { PrivacyPolicy } from './components/pages/PrivacyPolicy'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Top /> } />
        <Route path='/line/calendar' element={ <Calendar /> } />
        <Route path='/line/new' element={ <New /> } />
        <Route path='/line/scanner' element={ <Scanner /> } />
        <Route path='/use' element={ <Use /> } />
        <Route path='/terms' element={ <Terms /> } />
        <Route path='/privacy_policy' element={ <PrivacyPolicy /> } />
      </Routes>
    </BrowserRouter>
  )
}
