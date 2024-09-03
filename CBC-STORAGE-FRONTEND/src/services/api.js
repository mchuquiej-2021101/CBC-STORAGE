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