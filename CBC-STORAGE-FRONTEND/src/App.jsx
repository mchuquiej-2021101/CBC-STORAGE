import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { EmpleadoPage } from './pages/EmpleadoPage'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
    <>
      <EmpleadoPage/>
      <Toaster position='bottom-right' reverseOrder={false}/>
    </>
  )
}

export default App
