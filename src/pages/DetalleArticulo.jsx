import { Link, useParams } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

export default function DetalleArticulo() {
  const { id } = useParams()
  const { articulos, itemsCarrito, agregarAlCarrito } = useInventario()

  const articulo = articulos.find((a) => a.id === Number(id))

  if (!articulo) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4">El articulo no existe</p>
        <Link to="/" className="text-emerald-700 hover:underline">
          Volver al inventario
        </Link>
      </div>
    )
  }

  const enCarrito = itemsCarrito.find((i) => i.id === articulo.id)?.cantidadCarrito ?? 0
  const agotado = articulo.cantidad <= 0

  return (
    <section className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <Link to="/" className="text-sm text-emerald-700 hover:underline">
        Volver al inventario
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-4">{articulo.nombre}</h1>
      <dl className="grid grid-cols-2 gap-y-2 text-sm">
        <dt className="font-medium">Marca</dt>
        <dd>{articulo.marca}</dd>
        <dt className="font-medium">Tipo</dt>
        <dd>{articulo.tipo}</dd>
        <dt className="font-medium">Precio</dt>
        <dd>${articulo.precio.toLocaleString('es-CL')}</dd>
        <dt className="font-medium">Disponible</dt>
        <dd className={agotado ? 'text-red-600 font-semibold' : ''}>
          {agotado ? 'Agotado' : `${articulo.cantidad} unidades`}
        </dd>
        <dt className="font-medium">En tu carrito</dt>
        <dd>{enCarrito}</dd>
      </dl>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => agregarAlCarrito(articulo.id)}
          disabled={agotado}
          className="flex-1 rounded-md bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Agregar al carrito
        </button>
        <Link
          to="/carrito"
          className="flex-1 rounded-md border border-emerald-600 py-2 text-center font-semibold text-emerald-700 hover:bg-emerald-50 transition"
        >
          Ir al carrito
        </Link>
      </div>
    </section>
  )
}
