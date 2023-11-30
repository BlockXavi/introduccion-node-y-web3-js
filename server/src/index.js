// Paso 4: crear archivo index.js
// Archivo que será el punto de entrada de la aplicación

// Paso 5
// Importamos el módulo express
const express = require('express');

// Paso 6
// Creamos una instancia de express que llamamos app
const app = express();

// Paso 7
// Puerto en el que se ejecutará el servidor
const PORT = 8000; // Utilizamos mayúsculas para constantes cuando son muy relevantes y fijas

// Paso 8
// Definimos una base de datos de ejemplo en memoria
const database = {
    productos: [
        { id: 1, nombre: 'Producto 1', cantidad: 5 },
        { id: 2, nombre: 'Producto 2', cantidad: 10 },
        { id: 3, nombre: 'Producto 3', cantidad: 15 }
    ]
}

// Paso 9
// Middleware: Procesa la solicitud HTTP antes de que la aplicación la maneje.
// En este caso, 'express.json()' verifica si la solicitud es JSON.
app.use(express.json()) // Paso intermedio necesario

// Paso 10
// Definir una ruta raíz para comprobar el funcionamiento de la API
app.get('/', (req, res) => {
    res.send({ servidor: '¡Hola, mundo!' })
})

// Paso 11
// Ruta GET para obtener todos los productos
app.get('/api/productos', (req, res) => {
    // Devolvemos los productos en formato JSON con un código de estado 200 (OK)
    res.json(database.productos)
})

// Paso 12
// Define una ruta POST para crear un producto.
app.post('/api/productos', (req, res) => {
    // Obtenemos el producto a agregar desde el cuerpo de la solicitud (req.body).
    const producto = req.body
    // Agregamos el nuevo producto a la base de datos.
    database.productos.push(producto)
    // Devolvemos un mensaje de éxito junto con el producto agregado en formato json.
    res.send({ mensaje: 'Producto agregado correctamente', producto })
})


// Paso libre
// Defino una rute DELETE para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    // obtengo el Id del producto a aliminar de Params.
    const productoId = req.params.id
    // Filtro los valores de producto para definir otro array sin el productoId
    const productoSinProductoAEliminar = database.productos.filter((producto) => producto.id !== productoId)
    // Actualizo el database con el nuevo array
    database.productos = productoSinProductoAEliminar
    // Devolvemos un mensaje de éxito junto con el producto eliminado.
    res.send({ mensaje: 'Producto eliminado correctamente' })

})

// Paso 13
// Configuramos la aplicación para escuchar en el puerto específico.
app.listen(PORT, () => {
    console.log(`La API se está ejecutando en: 🚀🚀🚀 http://localhost:${PORT} 🚀🚀🚀`)
})