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