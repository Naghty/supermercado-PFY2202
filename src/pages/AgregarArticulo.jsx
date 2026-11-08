import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

const formularioVacio = { nombre: '', marca: '', tipo: '', precio: '', cantidad: '' }

const campo =
  'w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'

export default function AgregarArticulo() {
  const { agregarArticulo, articulos } = useInventario()
  const navigate = useNavigate()
  const [form, setForm] = useState(formularioVacio)
  const [error, setError] = useState('')

  const tiposExistentes = [...new Set(articulos.map((a) => a.tipo))]

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const manejarEnvio = (e) => {
    e.preventDefault()
    const precio = Number(form.precio)
    const cantidad = Number(form.cantidad)

    if (!form.nombre.trim() || !form.marca.trim() || !form.tipo.trim()) {
      setError('Nombre, marca y tipo son obligatorios')
      return
    }
    if (!Number.isFinite(precio) || precio <= 0) {
      setError('El precio debe ser mayor a 0')
      return
    }
    if (!Number.isInteger(cantidad) || cantidad < 0) {
      setError('La cantidad debe ser un entero mayor o igual a 0')
      return
    }

    agregarArticulo({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      tipo: form.tipo.trim(),
      precio,
      cantidad,
    })
    setForm(formularioVacio)
    setError('')
    navigate('/')
  }

  return (
    <section className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar articulo</h1>
      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={manejarCambio} className={campo} />
        </div>
        <div>
          <label htmlFor="marca" className="block text-sm font-medium mb-1">
            Marca
          </label>
          <input id="marca" name="marca" value={form.marca} onChange={manejarCambio} className={campo} />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium mb-1">
            Tipo de producto
          </label>
          <input
            id="tipo"
            name="tipo"
            list="tipos"
            value={form.tipo}
            onChange={manejarCambio}
            className={campo}
          />
          <datalist id="tipos">
            {tiposExistentes.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="precio" className="block text-sm font-medium mb-1">
              Precio
            </label>
            <input
              id="precio"
              name="precio"
              type="number"
              min="0"
              value={form.precio}
              onChange={manejarCambio}
              className={campo}
            />
          </div>
          <div>
            <label htmlFor="cantidad" className="block text-sm font-medium mb-1">
              Cantidad
            </label>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              min="0"
              value={form.cantidad}
              onChange={manejarCambio}
              className={campo}
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-emerald-600 py-2 font-semibold text-white hover:bg-emerald-700 transition"
        >
          Guardar articulo
        </button>
      </form>
    </section>
  )
}
