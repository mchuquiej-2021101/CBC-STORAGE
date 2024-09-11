import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { EmpleadoPage } from './pages/EmpleadoPage'
import { UbicacionPage } from './pages/UbicacionPage'
import { CategoriaPage } from './pages/CategoriaPage'
import { HerramientaPage } from './pages/HerramientaPage'
import { PrestamoPage } from './pages/PrestamoPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'


function App() {
    return (
    <div>
      
      <Routes>
        <Route path='/empleado' element={<EmpleadoPage/>}/>
        <Route path='/ubicacion' element={<UbicacionPage/>}/>
        <Route path='/categoria' element={<CategoriaPage/>}/>
        <Route path='/herramienta' element={<HerramientaPage/>}/>
        <Route path='/prestamo' element={<PrestamoPage/>} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
      <Toaster position='bottom-right' reverseOrder={false}/>
    
    </div>
  )
}

export default App
