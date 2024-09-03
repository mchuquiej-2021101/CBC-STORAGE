export const validateNombres = (nombres) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(nombres)
}

export const validateApellidos = (apellidos) => {
    const regex = /^[\w\s]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(apellidos)
}

export const validateEmail=(email)=>{
    const regex = /^[a-zA-Z0-9]{3,400}$/ // Acepta letras, números y espacios, de 3 a 400 caracteres
    return regex.test(email)
}

export const validateTelefono = (telefono) => {
    const regex = /^\d{8}$/ // Accepta 8 números
    return regex.test(telefono)
}


export const nombresEmpleadoValidationMessage = 'El nombre del empleado debe ser de entre 3 y 100 caracteres, con espacios permitidos.';
export const apellidosEmpleadoValidationMessage = 'El apellido del empleado debe ser de entre 3 y 100 caracteres, con espacios permitidos.';
export const emailEmpleadoValidationMessage = 'El email de la tarea debe ser de entre 3 y 200 caracteres, sin espacios permitidos.'
export const telefonoEmpleadoValidationMessage = 'El teléfono debe ser 8 dígitos, sin espacios permitidos.'
