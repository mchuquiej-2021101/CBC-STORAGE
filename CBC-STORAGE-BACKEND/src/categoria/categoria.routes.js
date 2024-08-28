'use strict'

import { Router } from "express"
import { save, get, update, deleteCategoria, search } from "./categoria.controller.js"

const api=Router()

api.post('/agregarCategoria', save)
api.get('/mostrarCategorias', get)
api.put('/actualizarCategoria/:id', update)
api.delete('/eliminarCategoria/:id', deleteCategoria)
api.post('/buscarCategoria', search)

export default api