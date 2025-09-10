import './App.css'
import { Routes, Route, useNavigate } from 'react-router'
import LogIn from './pages/auth/LogIn'
import Landing from './pages/Landing'
import AddClient from './pages/client-onboarding/AddClient'
import Questions from './pages/client-onboarding/Questions'

function App() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path='/' element={<LogIn navigate={navigate} />} />
      <Route path='/landing' element={<Landing navigate={navigate} />} />
      <Route path='/client-onboarding/add-client' element={<AddClient navigate={navigate} />} />
      <Route path='/client-onboarding/questions' element={<Questions navigate={navigate} />} />
      </Routes>
  )
}

export default App
