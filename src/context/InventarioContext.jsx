import { createContext, useContext, useMemo, useReducer } from 'react'

const inventarioInicial = [
  { id: 1, nombre: 'Leche entera 1L', marca: 'Colun', tipo: 'Lacteos', precio: 1200, cantidad: 20 },
  { id: 2, nombre: 'Yogurt natural', marca: 'Soprole', tipo: 'Lacteos', precio: 650, cantidad: 15 },
  { id: 3, nombre: 'Arroz grado 1 1kg', marca: 'Tucapel', tipo: 'Abarrotes', precio: 1590, cantidad: 30 },
  { id: 4, nombre: 'Fideos espagueti', marca: 'Carozzi', tipo: 'Abarrotes', precio: 990, cantidad: 25 },
  { id: 5, nombre: 'Manzana roja kg', marca: 'Feria Fresca', tipo: 'Frutas y verduras', precio: 1890, cantidad: 12 },
  { id: 6, nombre: 'Coca-Cola 2L', marca: 'Coca-Cola', tipo: 'Bebidas', precio: 2290, cantidad: 18 },
  { id: 7, nombre: 'Jugo de naranja 1L', marca: 'Watts', tipo: 'Bebidas', precio: 1390, cantidad: 10 },
  { id: 8, nombre: 'Detergente liquido 3L', marca: 'Omo', tipo: 'Limpieza', precio: 8990, cantidad: 8 },
]

const estadoInicial = {
  articulos: inventarioInicial,
  carrito: [],
}

function reducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_ARTICULO': {
      const siguienteId = estado.articulos.reduce((max, a) => Math.max(max, a.id), 0) + 1
      return {
        ...estado,
        articulos: [...estado.articulos, { ...accion.payload, id: siguienteId }],
      }
    }
    case 'AGREGAR_AL_CARRITO': {
      const articulo = estado.articulos.find((a) => a.id === accion.id)
      if (!articulo || articulo.cantidad <= 0) return estado
      const enCarrito = estado.carrito.find((c) => c.id === accion.id)
      return {
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, cantidad: a.cantidad - 1 } : a
        ),
        carrito: enCarrito
          ? estado.carrito.map((c) =>
              c.id === accion.id ? { ...c, cantidad: c.cantidad + 1 } : c
            )
          : [...estado.carrito, { id: accion.id, cantidad: 1 }],
      }
    }
    case 'QUITAR_UNIDAD': {
      const enCarrito = estado.carrito.find((c) => c.id === accion.id)
      if (!enCarrito) return estado
      const carrito =
        enCarrito.cantidad <= 1
          ? estado.carrito.filter((c) => c.id !== accion.id)
          : estado.carrito.map((c) =>
              c.id === accion.id ? { ...c, cantidad: c.cantidad - 1 } : c
            )
      return {
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, cantidad: a.cantidad + 1 } : a
        ),
        carrito,
      }
    }
    case 'ELIMINAR_DEL_CARRITO': {
      const enCarrito = estado.carrito.find((c) => c.id === accion.id)
      if (!enCarrito) return estado
      return {
        articulos: estado.articulos.map((a) =>
          a.id === accion.id ? { ...a, cantidad: a.cantidad + enCarrito.cantidad } : a
        ),
        carrito: estado.carrito.filter((c) => c.id !== accion.id),
      }
    }
    case 'VACIAR_CARRITO':
      return {
        ...estado,
        carrito: [],
      }
    default:
      return estado
  }
}

const InventarioContext = createContext(null)

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(reducer, estadoInicial)

  const valor = useMemo(() => {
    const itemsCarrito = estado.carrito
      .map((c) => {
        const articulo = estado.articulos.find((a) => a.id === c.id)
        return articulo ? { ...articulo, cantidadCarrito: c.cantidad } : null
      })
      .filter(Boolean)

    const totalUnidades = estado.carrito.reduce((suma, c) => suma + c.cantidad, 0)
    const totalPrecio = itemsCarrito.reduce((suma, i) => suma + i.precio * i.cantidadCarrito, 0)

    return {
      articulos: estado.articulos,
      itemsCarrito,
      totalUnidades,
      totalPrecio,
      agregarArticulo: (articulo) => dispatch({ type: 'AGREGAR_ARTICULO', payload: articulo }),
      agregarAlCarrito: (id) => dispatch({ type: 'AGREGAR_AL_CARRITO', id }),
      quitarUnidad: (id) => dispatch({ type: 'QUITAR_UNIDAD', id }),
      eliminarDelCarrito: (id) => dispatch({ type: 'ELIMINAR_DEL_CARRITO', id }),
      vaciarCarrito: () => dispatch({ type: 'VACIAR_CARRITO' }),
    }
  }, [estado])

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) throw new Error('useInventario debe usarse dentro de InventarioProvider')
  return contexto
}
