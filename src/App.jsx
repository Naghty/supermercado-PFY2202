import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ListaArticulos from './pages/ListaArticulos.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Navbar />
      <main className="max-w-5xl mx-auto p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<ListaArticulos />} />
          <Route path="/agregar" element={<AgregarArticulo />} />
          <Route path="/articulo/:id" element={<DetalleArticulo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<p className="text-center mt-10">Pagina no encontrada</p>} />
        </Routes>
      </main>
    </div>
  )
}
