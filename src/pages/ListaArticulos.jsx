import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

export default function ListaArticulos() {
  const { articulos } = useInventario()
  const [categoria, setCategoria] = useState('Todas')

  const categorias = useMemo(
    () => ['Todas', ...new Set(articulos.map((a) => a.tipo))],
    [articulos]
  )

  const articulosFiltrados = useMemo(
    () => (categoria === 'Todas' ? articulos : articulos.filter((a) => a.tipo === categoria)),
    [articulos, categoria]
  )

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <div>
          <label htmlFor="filtro" className="block text-sm font-medium mb-1">
            Filtrar por categoria
          </label>
          <select
            id="filtro"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full sm:w-56 rounded-md border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Marca</th>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-right">Disponible</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {articulosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-slate-500">
                  No hay articulos en esta categoria
                </td>
              </tr>
            ) : (
              articulosFiltrados.map((a) => (
                <tr key={a.id} className="border-t border-slate-200 hover:bg-emerald-50">
                  <td className="px-4 py-3 font-medium">{a.nombre}</td>
                  <td className="px-4 py-3">{a.marca}</td>
                  <td className="px-4 py-3">{a.tipo}</td>
                  <td className="px-4 py-3 text-right">${a.precio.toLocaleString('es-CL')}</td>
                  <td className="px-4 py-3 text-right">
                    {a.cantidad > 0 ? (
                      a.cantidad
                    ) : (
                      <span className="text-red-600 font-semibold">Agotado</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/articulo/${a.id}`}
                      className="text-emerald-700 font-medium hover:underline"
                    >
                      Ver detalle
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
