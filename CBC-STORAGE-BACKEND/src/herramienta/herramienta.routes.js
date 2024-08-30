'use strict'
import { Router } from "express"
import { save, get, update, deleteHerramienta, search } from "./herramienta.controller.js"

const api=Router()

api.post('/agregarHerramienta', save)
api.get('/mostrarHerramientas', get)
api.put('/actualizarHerramienta/:id', update)
api.delete('/eliminarHerramienta/:id', deleteHerramienta)
api.post('/buscarHerramienta', search)

export default api