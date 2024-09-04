export const validateUbicacion = (ubicacion) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(ubicacion)
}

export const validateCapacidad = (capacidad) => {
    const regex = /^\d{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(capacidad)
}

export const ubicacionUbicacionValidationMessage = 'Puede contener letras y números'
export const capacidadUbicacionValidationMessage = 'La capacidad debe ser un valor numérico entero'
