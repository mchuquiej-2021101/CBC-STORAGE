import { loginRequest, updatePasswordRequest } from "../../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const login = async (usuario, contrasena) => {
        setIsLoading(true);
        const user = {
            usuario,
            contrasena
        };

        try {
            const response = await loginRequest(user);
            setIsLoading(false);

            if (response.error) {
                toast.error('Error al logearse');
                return false;  
            }
            
            toast.success('Bienvenido ' + usuario);            
            localStorage.setItem('token', response.data.token);
            
            // Obtener el userId desde response.data.loggedUser.uid
            const userId = response.data.loggedUser.uid;
            console.log("ID del usuario:", userId);

            // Mostrar el prompt para la nueva contraseña
            const newPassword = prompt('Por favor, ingrese una nueva contraseña:');
            console.log(newPassword);
            if (newPassword) {
                setIsUpdatingPassword(true);
                await updatePasswordRequest(userId, { contrasena: newPassword });
                toast.success('Contraseña actualizada con éxito');
            }

            return true;  
        } catch (error) {
            setIsLoading(false);
            setIsUpdatingPassword(false);
            toast.error('Error en el proceso de login o actualización de contraseña');
            return false;  
        }
    };

    return {
        login,
        isLoading,
        isUpdatingPassword
    };
};
