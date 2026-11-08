import { NavLink } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

const claseLink = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? 'bg-white text-emerald-700' : 'text-white hover:bg-emerald-600'
  }`

export default function Navbar() {
  const { totalUnidades } = useInventario()

  return (
    <header className="bg-emerald-700 shadow">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
        <span className="text-white font-bold text-lg mr-4">Supermercado</span>
        <NavLink to="/" end className={claseLink}>
          Inventario
        </NavLink>
        <NavLink to="/agregar" className={claseLink}>
          Agregar articulo
        </NavLink>
        <NavLink to="/carrito" className={claseLink}>
          Carrito
          <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-1 rounded-full bg-amber-400 text-slate-900 text-xs font-bold">
            {totalUnidades}
          </span>
        </NavLink>
      </nav>
    </header>
  )
}
