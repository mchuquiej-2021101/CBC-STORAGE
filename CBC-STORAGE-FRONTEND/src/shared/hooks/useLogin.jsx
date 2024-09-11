import { loginRequest } from "../../services/api";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login=async(usuario, contrasena)=>{
        setIsLoading(true)
        const user={
            usuario,
            contrasena
        }

        const response=await loginRequest(user)
        setIsLoading(false)

        if(response.error) {
            toast.error('Error al logearse')
            return console.log('Error al logearse',response.error)
        }
        toast.success('Bienvenido '+usuario)
        localStorage.setItem('token', response.data.token)
        
    }

    return {
        login,
        isLoading
    }
 
}