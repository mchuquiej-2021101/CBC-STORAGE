import { EmpleadoPage } from './pages/EmpleadoPage';
import { UbicacionPage } from './pages/UbicacionPage';
import { CategoriaPage } from './pages/CategoriaPage';
import { HerramientaPage } from './pages/HerramientaPage';
import { PrestamoPage } from './pages/PrestamoPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthPage } from './pages/AuthPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage'; 
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} /> 
        
        <Route path='/empleado' element={
          <ProtectedRoute>
            <EmpleadoPage />
          </ProtectedRoute>
        } />
        <Route path='/ubicacion' element={
          <ProtectedRoute>
            <UbicacionPage />
          </ProtectedRoute>
        } />
        <Route path='/categoria' element={
          <ProtectedRoute>
            <CategoriaPage />
          </ProtectedRoute>
        } />
        <Route path='/herramienta' element={
          <ProtectedRoute>
            <HerramientaPage />
          </ProtectedRoute>
        } />
        <Route path='/prestamo' element={
          <ProtectedRoute>
            <PrestamoPage />
          </ProtectedRoute>
        } />
        
        
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      <Toaster position='bottom-right' reverseOrder={false} />
    </div>
  );
}

export default App;
