'use strict'
import { Router } from "express"
import { save, get, update, deleteUbicacion, search } from "./ubicacion.controller.js"

const api=Router()

api.post('/agregarUbicacion', save)
api.get('/mostrarUbicaciones', get)
api.put('/actualizarUbicacion/:id', update)
api.delete('/eliminarUbicacion/:id', deleteUbicacion)
api.post('/buscarUbicacion', search)

export default api