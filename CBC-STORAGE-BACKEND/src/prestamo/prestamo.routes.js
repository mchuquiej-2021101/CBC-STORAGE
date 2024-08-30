'use strict'
import { Router } from "express"
import { save, get, update, deletePrestamo } from "./prestamo.controller.js"

const api=Router()

api.post('/agregarPrestamo',save)
api.get('/mostrarPrestamos',get)
api.put('/actualizarPrestamo',update)
api.delete('/eliminarPrestamo',deletePrestamo)

export default api