import { useState, useEffect } from "react";
import { Input } from '../Input'
import { useHerramienta } from "../../shared/hooks/useHerramienta.jsx";
import {
    skuHerramientaValidationMessage,
    validateSku,
    nombreHerramientaValidationMessage,
    validateNombre,
    stockHerramientaValidationMessage,
    validateStock,
    marcaHerramientaValidationMessage,
    validateMarca,
    modeloHerramientaValidationMessage,
    validateModelo,
    categoriaHerramientaValidationMessage,
    validateCategoria,
    ubicacionHerramientaValidationMessage,
    validateUbicacion
} from '../../shared/validators/validatorHerramienta.js'
import toast from "react-hot-toast";
import { useCategoria } from "../../shared/hooks/useCategoria.jsx";
import { useUbicacion } from '../../shared/hooks/useUbicacion.jsx'

export const TodoListFormHerramienta = () => {
    const { addHerramienta, getHerramientas, updateHerramienta, deleteHerramienta, isLoading, herramientas } = useHerramienta()

    //para el cmb
    const { getCategorias, categorias = [] } = useCategoria();
    const { getUbicaciones, ubicaciones = [] } = useUbicacion()

    useEffect(() => {
        getCategorias();
        getUbicaciones()
    }, []);

    const initialFormData = {
        SKU: {
            value: "",
            isValid: false,
            showError: false
        },
        nombre: {
            value: "",
            isValid: false,
            showError: false
        },
        stock: {
            value: "",
            isValid: false,
            showError: false
        },
        marca: {
            value: "",
            isValid: false,
            showError: false
        },
        modelo: {
            value: "",
            isValid: false,
            showError: false
        },
        categoria: {
            value: "",
            isValid: false,
            showError: false
        },
        ubicacion: {
            value: "",
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(initialFormData)
    const [editingHerramientaId, setEditingHerramientaId] = useState(null)

    const fetchHerramientas = async () => {
        try {
            await getHerramientas()
        } catch (error) {
            console.log('Error al mostrar las herramientas en fetchHerramientas')
        }
    }

    const handleValueChange = (value, field) => {
        let isValid = false;

        if (field === "categoria" || field === "ubicacion") {
            isValid = value !== ""; // Si se selecciona algo, será válido.
        }

        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid: field === "categoria" || field === "ubicacion" ? isValid : prevData[field].isValid, // Solo actualizar isValid si es categoría o ubicación.
            }
        }));
    };


    const handleValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case "SKU":
                isValid = validateSku(value);
                break;
            case "nombre":
                isValid = validateNombre(value);
                break;
            case "stock":
                isValid = validateStock(value);
                break;
            case "marca":
                isValid = validateMarca(value);
                break;
            case "modelo":
                isValid = validateModelo(value);
                break;
            case "categoria":
                isValid = value !== "";  // Validar si una opción está seleccionada
                break;
            case "ubicacion":
                isValid = value !== "";  // Validar si una opción está seleccionada
                break;
            default:
                break;
        }
    
        setFormData(prevData => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                value,
                isValid,
                showError: !isValid
            }
        }));
    };
    

    const handleAddHerramienta = async (e) => {
        e.preventDefault()
        try {
            if (editingHerramientaId) {
                await updateHerramienta(editingHerramientaId, {
                    SKU: formData.SKU.value,
                    nombre: formData.nombre.value,
                    stock: formData.stock.value,
                    marca: formData.marca.value,
                    modelo: formData.modelo.value,
                    categoria: formData.categoria.value,
                    ubicacion: formData.ubicacion.value
                })
                toast.success('Herramienta actualizada exitosamente')
            } else {
                await addHerramienta(
                    formData.SKU.value,
                    formData.nombre.value,
                    formData.stock.value,
                    formData.marca.value,
                    formData.modelo.value,
                    formData.categoria.value,
                    formData.ubicacion.value
                )
                toast.success('Herramienta agregada exitosamente')
            }
            setFormData(initialFormData)
            setEditingHerramientaId(null)
            fetchHerramientas()
        } catch (error) {
            console.error('Error al agregar/actualizar herramienta', error)
            toast.error('Error al agregar/actualizar herramienta')
        }
    }

    const handleEditHerramienta = (herramientaId) => {
        const herramientaToEdit = herramientas.find(herramienta => herramienta._id === herramientaId)
        if (herramientaToEdit) {
            setFormData({
                SKU: {
                    value: herramientaToEdit.SKU,
                    isValid: true,
                    showError: false
                },
                nombre: {
                    value: herramientaToEdit.nombre,
                    isValid: true,
                    showError: false
                },
                stock: {
                    value: herramientaToEdit.stock,
                    isValid: true,
                    showError: false
                },
                marca: {
                    value: herramientaToEdit.marca,
                    isValid: true,
                    showError: false
                },
                modelo: {
                    value: herramientaToEdit.modelo,
                    isValid: true,
                    showError: false
                },
                categoria: {
                    value: herramientaToEdit.categoria._id, // Asegúrate de que este valor es igual a un _id en categorias
                    isValid: true,
                    showError: false
                },
                ubicacion: {
                    value: herramientaToEdit.ubicacion._id, // Asegúrate de que este valor es igual a un _id en ubicaciones
                    isValid: true,
                    showError: false
                }
            })
            setEditingHerramientaId(herramientaId)
        }
    }

    const handleDeleteHerramienta = async (herramientaId) => {
        if (window.confirm('¿Estás seguro de eliminar esta herramienta?')) {
            try {
                await deleteHerramienta(herramientaId)
                toast.success('Herramienta eliminada exitosamente')
                fetchHerramientas()
            } catch (error) {
                console.log('Error al eliminar la herramienta')
                toast.error('Error al eliminar la herramienta')
            }
        }
    }

    const cancel = () => {
        setFormData(initialFormData)
    }

    const isSubmitButtonDisabled =
        !formData.SKU.isValid ||
        !formData.nombre.isValid ||
        !formData.stock.isValid ||
        !formData.marca.isValid ||
        !formData.modelo.isValid ||
        !formData.categoria.isValid ||
        !formData.ubicacion.isValid

    return (
        <div>
            <form onSubmit={handleAddHerramienta}>
                <Input
                    field="SKU"
                    label="SKU"
                    value={formData.SKU.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.SKU.showError}
                    validationMessage={skuHerramientaValidationMessage}
                />
                <Input
                    field="nombre"
                    label="Nombre"
                    value={formData.nombre.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.nombre.showError}
                    validationMessage={nombreHerramientaValidationMessage}
                />
                <Input
                    field="stock"
                    label="Stock"
                    value={formData.stock.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.stock.showError}
                    validationMessage={stockHerramientaValidationMessage}
                />
                <Input
                    field="marca"
                    label="Marca"
                    value={formData.marca.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.marca.showError}
                    validationMessage={marcaHerramientaValidationMessage}
                />
                <Input
                    field="modelo"
                    label="Modelo"
                    value={formData.modelo.value}
                    onChangeHandler={handleValueChange}
                    type="text"
                    onBlurHandler={handleValidationOnBlur}
                    showErrorMessage={formData.modelo.showError}
                    validationMessage={modeloHerramientaValidationMessage}
                />

                <div>
                <select
                    value={formData.categoria.value}
                    onChange={(e) => handleValueChange(e.target.value, 'categoria')}
                    onBlur={() => handleValidationOnBlur(formData.categoria.value, 'categoria')} // Validación al perder el foco
                    required
                >
                    <option value="">Seleccione la Categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria._id} value={categoria._id}>{categoria.categoria}</option>
                    ))}
                </select>
                </div>

                <div>
                <select
                    value={formData.ubicacion.value}
                    onChange={(e) => handleValueChange(e.target.value, 'ubicacion')}
                    onBlur={() => handleValidationOnBlur(formData.ubicacion.value, 'ubicacion')}
                    required
                >
                    <option value="">Seleccione la Ubicación</option>
                    {ubicaciones.map((ubicacion) => (
                        <option key={ubicacion._id} value={ubicacion._id}>{ubicacion.ubicacion}</option>
                    ))}
                </select>
                </div>



                <div></div>

                <button type="submit" disabled={isSubmitButtonDisabled}>
                    {editingHerramientaId ? 'Actualizar Herramienta' : 'Agregar Herramienta'}
                </button>
                <button type="button" onClick={cancel}>
                    Cancelar
                </button>
            </form>
            <div>
                <h2>Herramientas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Nombre</th>
                            <th>Stock</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Categoría</th>
                            <th>Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {herramientas && herramientas.length > 0 && herramientas.map((herramienta, index) => (
                            <tr key={index}>
                                <td>{herramienta.SKU}</td>
                                <td>{herramienta.nombre}</td>
                                <td>{herramienta.stock}</td>
                                <td>{herramienta.marca}</td>
                                <td>{herramienta.modelo}</td>
                                <td>{herramienta.categoria.categoria}</td>
                                <td>{herramienta.ubicacion.ubicacion}</td>
                                <td>
                                    <svg onClick={() => handleEditHerramienta(herramienta._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    <svg onClick={() => handleDeleteHerramienta(herramienta._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
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