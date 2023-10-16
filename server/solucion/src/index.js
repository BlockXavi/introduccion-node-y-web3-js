// Importamos el modulo express
const express = require('express')

// Crear una instancia de express
const app = express()

// Puerto en el que se ejecutará el servidor
const PORT = 8000

// Definimos una base de datos de ejemplo en memoria
const database = {
  productos: [
    { id: 1, nombre: 'Producto 1', cantidad: 5 },
    { id: 2, nombre: 'Producto 2', cantidad: 10 },
    { id: 3, nombre: 'Producto 3', cantidad: 15 }
  ]
}

// Middleware: Procesa la solicitud HTTP antes de que la aplicación la maneje.
// En este caso, 'express.json()' verifica si la solicitud es JSON.
app.use(express.json())

// Ruta de raiz para comprovar que la API esta funcionando.
app.get('/', (req, res) => {
  res.send({ servidor: '¡Hola, mundo!' })
})

// Definimos la ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
  // Devemos los productos en formato JSON y con codigo de estado 200 (OK).
  res.json(database.productos)
})

// Definimos la ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
  // Obtenemos el producto a agregar desde el cuerpo de la solicitud (req.body = request body = cuerpo de la solicitud).
  const nuevoProducto = req.body
  // Agregamos el nuevo producto a la base de datos.
  database.productos.push(nuevoProducto)
  // Devolvemos el producto agregado en formato JSON y con un mensaje de exito.
  res.json({ message: 'Producto agregado correctamente', producto: nuevoProducto })
})

// Le decimos a la aplicación que escuche en el puerto 8000.
app.listen(PORT, () => {
  console.log(`La API se esta ejecutando en: 🚀🚀🚀 http://localhost:${PORT} 🚀🚀🚀`)
})
