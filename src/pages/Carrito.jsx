import { Link } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

export default function Carrito() {
  const {
    itemsCarrito,
    totalPrecio,
    totalUnidades,
    agregarAlCarrito,
    quitarUnidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useInventario()

  if (itemsCarrito.length === 0) {
    return (
      <section className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-2">Carrito de compras</h1>
        <p className="mb-4 text-slate-600">Tu carrito esta vacio</p>
        <Link to="/" className="text-emerald-700 font-medium hover:underline">
          Ir al inventario
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3">Articulo</th>
              <th className="px-4 py-3 text-right">Precio</th>
              <th className="px-4 py-3 text-center">Cantidad</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
              <th className="px-4 py-3 text-right">Stock restante</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {itemsCarrito.map((i) => (
              <tr key={i.id} className="border-t border-slate-200">
                <td className="px-4 py-3">
                  <Link to={`/articulo/${i.id}`} className="font-medium hover:underline">
                    {i.nombre}
                  </Link>
                  <div className="text-xs text-slate-500">{i.marca}</div>
                </td>
                <td className="px-4 py-3 text-right">${i.precio.toLocaleString('es-CL')}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => quitarUnidad(i.id)}
                      className="w-8 h-8 rounded bg-slate-200 font-bold hover:bg-slate-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{i.cantidadCarrito}</span>
                    <button
                      onClick={() => agregarAlCarrito(i.id)}
                      disabled={i.cantidad <= 0}
                      className="w-8 h-8 rounded bg-emerald-600 font-bold text-white hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  ${(i.precio * i.cantidadCarrito).toLocaleString('es-CL')}
                </td>
                <td className="px-4 py-3 text-right">{i.cantidad}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => eliminarDelCarrito(i.id)}
                    className="text-red-600 hover:underline"
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button onClick={vaciarCarrito} className="text-sm text-slate-600 hover:underline text-left">
          Confirmar compra y vaciar carrito
        </button>
        <p className="text-lg font-bold">
          {totalUnidades} unidades - Total: ${totalPrecio.toLocaleString('es-CL')}
        </p>
      </div>
    </section>
  )
}
