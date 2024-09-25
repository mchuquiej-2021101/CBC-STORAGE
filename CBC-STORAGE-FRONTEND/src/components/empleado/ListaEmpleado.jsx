import { useState } from "react";
import { Input } from "../Input";
import { useEmpleado } from "../../shared/hooks/useEmpleado.jsx";
import toast from "react-hot-toast";
import {
    nombresEmpleadoValidationMessage,
    validateNombres,
    apellidosEmpleadoValidationMessage,
    validateApellidos,
    emailEmpleadoValidationMessage,
    validateEmail,
    telefonoEmpleadoValidationMessage,
    validateTelefono
} from '../../shared/validators/validatorEmpleado.js'

export const TodoListFormEmpleado = () => {
    const { addEmpleado, getEmpleados, updateEmpleado, deleteEmpleado, empleados } = useEmpleado()

    const initialFormData = {
        nombres: {
            value: "",
            isValid: false,
            showError: false
        },
        apellidos: {
            value: "",
            isValid: false,
            showError: false
        },
        email: {
            value: "",
            isValid: false,
            showError: false
        },
        telefono: {
            value: "",
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(initialFormData)
    const [editingEmpleadoId, setEditingEmpleadoId] = useState(null)

    const fetchEmpleados = async () => {
        try {
            await getEmpleados()
        } catch (error) {
            console.error("Error al obtener empleados en fetchEmpleado")
        }
    }

    const handleValueChange = (value, field) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value
            }
        }))
    }

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'nombres':
                isValid = validateNombres(value)
                break;
            case 'apellidos':
                isValid = validateApellidos(value)
                break;
            case 'email':
                isValid = validateEmail(value)
                break;
            case 'telefono':
                isValid = validateTelefono(value)
                break
            default:
                break
        }
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleAddEmpleado = async (e) => {
        e.preventDefault()
        try {
            if (editingEmpleadoId) {
                console.log("editar 1")
                await updateEmpleado(editingEmpleadoId, {
                    nombres: formData.nombres.value,
                    apellidos: formData.apellidos.value,
                    email: formData.email.value,
                    telefono: formData.telefono.value
                })
                console.log("editar 2")
                toast.success('Empleado actualizado exitosamente')
            } else {
                await addEmpleado(
                    formData.nombres.value,
                    formData.apellidos.value,
                    formData.email.value,
                    formData.telefono.value
                )
                toast.success('Empleado agregado exitosamente')
            }
            setFormData(initialFormData)
            setEditingEmpleadoId(null)
            fetchEmpleados()
        } catch (error) {
            console.error('Error al agregar/actualizar empleado')
            toast.error('Error al agregar/actualizar empleado')
        }
    }

    const handleEditEmpleado = (empleadoId) => {
        console.log("1")
        const empleadoToEdit = empleados.find(empleado => empleado._id === empleadoId)
        console.log("2")
        if (empleadoToEdit) {
            setFormData({
                nombres: {
                    value: empleadoToEdit.nombres,
                    isValid: true,
                    showError: false
                },
                apellidos: {
                    value: empleadoToEdit.apellidos,
                    isValid: true,
                    showError: false
                },
                email: {
                    value: empleadoToEdit.email,
                    isValid: true,
                    showError: false
                },
                telefono: {
                    value: empleadoToEdit.telefono,
                    isValid: true,
                    showError: false
                }
            })
            console.log("3")
            setEditingEmpleadoId(empleadoId)
        }
    }

    const handleDeleteEmpleado = async (empleadoId) => {
        if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
            try {
                await deleteEmpleado(empleadoId)
                toast.success('Empleado eliminado exitosamente')
                fetchEmpleados()
            } catch (error) {
                console.error("Error al eliminar el empleado")
                toast.error('Error al eliminar el empleado')
            }
        }
    }

    const cancel = () => {
        setFormData(initialFormData)
    }

    const isSubmitButtonDisabled =
        !formData.nombres.isValid ||
        !formData.apellidos.isValid ||
        !formData.email.isValid ||
        !formData.telefono.isValid

    return (
        <div>
            <form onSubmit={handleAddEmpleado}>
                <Input
                    field='nombres'
                    label='Nombres del empleado'
                    value={formData.nombres.value}
                    onChangeHandler={handleValueChange}
                    type='text'
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombres.showError}
                    validationMessage={nombresEmpleadoValidationMessage}
                />
                <Input
                    field="apellidos"
                    label="Apellidos del empleado"
                    value={formData.apellidos.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.apellidos.showError}
                    validationMessage={apellidosEmpleadoValidationMessage}
                />
                <Input
                    field="email"
                    label="Email del empleado"
                    value={formData.email.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.email.showError}
                    validationMessage={emailEmpleadoValidationMessage}
                />
                <Input
                    field="telefono"
                    label="Teléfono"
                    value={formData.telefono.value}
                    onChangeHandler={handleValueChange}
                    type="text"//puede dar error
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.telefono.showError}
                    validationMessage={telefonoEmpleadoValidationMessage}
                />
                <div></div>
                <button type="submit" disabled={isSubmitButtonDisabled}>
                    {editingEmpleadoId ? 'Actualizar Empleado' : 'Agregar Empleado'}
                </button>
                <button type="button" onClick={cancel}>
                    Cancelar
                </button>
            </form>
            <div>
                <h2>Empleados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados && empleados.length > 0 && empleados.map((empleado, index) => (
                            <tr key={index}>
                                <td>{empleado.nombres}</td>
                                <td>{empleado.apellidos}</td>
                                <td>{empleado.email}</td>
                                <td>{empleado.telefono}</td>
                                <td>
                                    <svg onClick={() => handleEditEmpleado(empleado._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    <svg onClick={() => handleDeleteEmpleado(empleado._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )

}