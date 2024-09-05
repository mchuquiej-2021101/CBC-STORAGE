import axios from "axios";

const apiClient=axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

//EMPLEADO

export const addEmpleadoRequest=async(empleado)=>{
    try {
        return await apiClient.post('/agregarEmpleado', empleado)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getEmpleadosRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarEmpleados')
        return response.data.empleados
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateEmpleadoRequest=async(empleadoId, updatedEmpleado)=>{
    try {
        return await apiClient.put(`/actualizarEmpleado/${empleadoId}`, updatedEmpleado)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteEmpleadoRequest=async(empleadoId)=>{
    try {
        return await apiClient.delete(`/eliminarEmpleado/${empleadoId}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//UBICACION
export const addUbicacionRequest=async(ubicacion)=>{
    try {
        return await apiClient.post('/agregarUbicacion', ubicacion)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getUbicacionesRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarUbicaciones')
        return response.data.ubicaciones
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const updateUbicacionRequest=async(ubicacionId, updatedUbicacion)=>{
    try {
        return await apiClient.put(`/actualizarUbicacion/${ubicacionId}`, updatedUbicacion)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const deleteUbicacionRequest=async(ubicacionId)=>{
    try {
        return await apiClient.delete(`/eliminarUbicacion/${ubicacionId}`)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//CATEGORIA
export const addCategoriaRequest=async(categoria)=>{
    try {
        return await apiClient.post('/agregarCategoria', categoria)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getCategoriaRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarCategorias')
        console.log(response)
        return response.data.categorias
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const updateCategoriaRequest=async(categoriaId, updatedCategoria)=>{
    try {
        return await apiClient.put(`/actualizarCategoria/${categoriaId}`, updatedCategoria)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const deleteCategoriaRequest=async(categoriaId)=>{
    try {
        return await apiClient.delete(`/eliminarCategoria/${categoriaId}`)
    } catch (error) {
        return{
            error: true,
            err
        }
    }
}

//HERRAMIENTA
export const addHerramientaRequest=async(herramienta)=>{
    try {
        return await apiClient.post('/agregarHerramienta', herramienta)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}

export const getHerramientasRequest=async()=>{
    try {
        const response=await apiClient.get('/mostrarHerramientas')
        return response.data.herramientas
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}


export const updateHerramientaRequest=async(herramientaId, updatedHerramienta)=>{
    try {
        return await apiClient.put(`/actualizarHerramienta/${herramientaId}`, updatedHerramienta)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const deleteHerramientaRequest=async(herramientaId)=>{
    try {
        return await apiClient.delete(`/eliminarHerramienta/${herramientaId}`)
    } catch (err) {
        return{
            error: true,
            err
        }
    }
}
