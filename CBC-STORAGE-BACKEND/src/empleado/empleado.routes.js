'use strict'

import { Router } from "express"
import { save, get, update, deleteEmpleado, search } from "./empleado.controller.js"

const api=Router()

api.post('/agregarEmpleado', save)
api.get('/mostrarEmpleados', get)
api.put('/actualizarEmpleado/:id', update)
api.delete('/eliminarEmpleado/:id', deleteEmpleado)
api.post('/buscarEmpleado', search)

export default api