//Importaciones
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import empleadoRoutes from '../src/empleado/empleado.routes.js'
import categoriaRoutes from '../src/categoria/categoria.routes.js'
import ubicacionRoutes from '../src/ubicacion/ubicacion.routes.js'
import herramientaRoutes from '../src/herramienta/herramienta.routes.js'
import prestamoRoutes from '../src/prestamo/prestamo.routes.js'
import adminRoutes from '../src/admin/admin.routes.js'

//Configuraciones
const app = express() //Crear el servidor
config()
const port = process.env.PORT || 3200

//Configurar el servidor de express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Aceptar o denegar las solicitudes de diferentes orígenes (local, remoto) /políticas de acceso
app.use(helmet()) //Aplica capa de seguridad
app.use(morgan('dev')) //Crea logs de solicitudes al servidor HTTP

//Declaración de rutas
app.use(empleadoRoutes)
app.use(categoriaRoutes)
app.use(ubicacionRoutes)
app.use(herramientaRoutes)
app.use(prestamoRoutes)
app.use(adminRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}