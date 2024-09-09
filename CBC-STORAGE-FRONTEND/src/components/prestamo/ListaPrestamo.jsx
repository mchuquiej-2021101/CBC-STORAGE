import { useState, useEffect } from "react";
import {Input} from '../Input.jsx'
import { usePrestamo } from "../../shared/hooks/usePrestamo.jsx";
import{
    cantidadHerramientasValidationMessage,
    validateCantidadHerramientas,
    validateFechaFin,
    estadoValidationMessage,
    fechaFinValidationMessage,
    fechaInicioValidationMessage,
    validateEstado,
    validateFechaInicio,
    validateFechaInicioFin,
    hrramientaValidationMessage,
    empleadoValidationMessage
} from '../../shared/validators/validatorPrestamo.js'
import toast from "react-hot-toast";
import {useHerramienta} from '../../shared/hooks/useHerramienta.jsx'
import {useEmpleado} from '../../shared/hooks/useEmpleado.jsx'

export const TodoListFormPrestamo=()=>{
    const { addPrestamo, getPrestamos, updatePrestamo, deletePrestamo, isLoading, prestamos } = usePrestamo()

    const {getHerramientas, herramientas=[]}=useHerramienta()
    const {getEmpleados, empleados=[]} = useEmpleado()

    useEffect(()=>{
        getHerramientas()
        getEmpleados()
    }, [])

    const initialFormData={
        herramienta:{
            value: "",
            isValid: false,
            showError: false
        },
        cantidadHerramientas:{
            value: "",
            isValid: false,
            showError: false
        },
        empleado:{
            value: "",
            isValid: false,
            showError: false
        },
        fechaPrestamo:{
            value: "",
            isValid: false,
            showError: false
        },
        fechaDevolucion:{
            value: "",
            isValid: false,
            showError: false
        },
        estado:{
            value: "",
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData]=useState(initialFormData)
    const [editingPrestamoId, setEditingPrestamoId]=useState(null)

    const fetchPrestamos=async()=>{
        try {
            await getPrestamos()
        } catch (error) {
            console.error('Error al mostrar prestamos en fetchPrestamos')
        }
    }

    const handleValueChange=(value, field)=>{
        let isValid=false

        if(field === "herramienta" || field=== "empleado"){
            isValid=value!==""
        }

        setFormData(prevData=>({
            ...prevData,
            [field]:{
                ...prevData[field],
                value,
                isValid: field==="herramienta" || field==="empleado" ? isValid : prevData[field].isValid,                
            }
        }))
    }

    const handleValidationOnBlur=(value, field)=>{
        let isValid=false
        switch(field){
            case "herramienta":
                isValid=value!=""
                break;
            case "cantidadHerramientas":
                isValid=validateCantidadHerramientas(value)
                break
            case "empleado":
                isValid=value!=""
                break
            case "fechaPrestamo":
                isValid=validateFechaInicio(value)
                break
            case "fechaDevolucion":
                isValid=validateFechaInicioFin(value)
                break
            case "estado":
                isValid=validateEstado(value)
                break
        }

        setFormData(prevData=>({
            ...prevData,
            [field]:{
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleAddPrestamo=async(e)=>{
        e.preventDefault()
        try {
            if(editingPrestamoId){
                await updatePrestamo(editingPrestamoId,{
                    herramienta: formData.herramienta.value,
                    cantidadHerramientas: formData.cantidadHerramientas.value,
                    empleado: formData.empleado.value,
                    fechaPrestamo: formData.fechaPrestamo.value,
                    fechaDevolucion: formData.fechaDevolucion.value,
                    estado: formData.estado.value
                })
                toast.success('Préstamo actualizado correctamente')
            }else{
                await addPrestamo(
                    formData.herramienta.value,
                    formData.cantidadHerramientas.value,
                    formData.empleado.value,
                    formData.fechaPrestamo.value,
                    formData.fechaDevolucion.value,
                    formData.estado.value
                )
                toast.success('Préstamo agregado exitosamente')
            }
            setFormData(initialFormData)
            setEditingPrestamoId(null)
            fetchPrestamos()
        } catch (error) {
            console.error("Error al agregar/actualizar préstamo", error)
            toast.error('Error al agregar/actualizar préstamo')
        }
    }

    const handleEditPrestamo=(prestamoId)=>{
        const prestamoToEdit=prestamos.find(prestamo => prestamo._id===prestamoId)
        if(prestamoToEdit){
            setFormData({
                herramienta:{
                    value: prestamoToEdit.herramienta._id,
                    isValid: true,
                    showError: false
                },
                cantidadHerramientas:{
                    value: prestamoToEdit.cantidadHerramientas,
                    isValid: true,
                    showError: false
                },
                empleado:{
                    value: prestamoToEdit.empleado._id,
                    isValid: true,
                    showError: false
                },
                fechaPrestamo:{
                    value: prestamoToEdit.fechaPrestamo,
                    isValid: true,
                    showError: false
                },
                fechaDevolucion:{
                    value: prestamoToEdit.fechaDevolucion,
                    isValid: true,
                    showError: false
                },
                estado:{
                    value: prestamoToEdit.estado,
                    isValid: true,
                    showError: false
                }
            })
            setEditingPrestamoId(prestamoId)
        }
    }

    const handleDeletePrestamo=async(prestamoId)=>{
        if(window.confirm('¿Estás seguro de eliminar este préstamo?')){
            try {
                await deletePrestamo(prestamoId)
                toast.success('Préstamo eliminado exitósamente')
                fetchPrestamos()
            } catch (error) {
                console.log('Error al eliminar el préstamo')
                toast.error('Error al eliminar el préstamo')
            }
        }
    }

    const cancel=()=>{
        setFormData(initialFormData)
    }

    const isSubmitButtonDisabled=
        !formData.herramienta.isValid ||
        !formData.cantidadHerramientas.isValid ||
        !formData.empleado.isValid ||
        !formData.fechaPrestamo.isValid ||
        !formData.fechaDevolucion.isValid || /* aquí creo que no va */
        !formData.estado.isValid

    return(
        <div>
            <form onSubmit={handleAddPrestamo}>
                <Input
                    field="herramienta"
                    label="Herramienta"
                    value={formData.herramienta.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.herramienta.showError}
                    validationMessage={hrramientaValidationMessage}
                />
                <Input
                    field="cantidadHerramientas"
                    label="Cantidad Herramientas"
                    value={formData.cantidadHerramientas.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.cantidadHerramientas.showError}
                    validationMessage={cantidadHerramientasValidationMessage}
                />
                <Input
                    field="empleado"
                    label="Empleado"
                    value={formData.empleado.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.empleado.showError}
                    validationMessage={empleadoValidationMessage}
                />
            </form>
        </div>
    )
}

