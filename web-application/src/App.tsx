import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Authenticate from './pages/Authentication/Authentication'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/auth/*" element={<Authenticate />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
