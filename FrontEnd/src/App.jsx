import { useState } from 'react'
import './App.css'
import Inscription from './Components/Inscription'
import Login from './Components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Login/>
      <Inscription/>
    </>
  )
}

export default App
