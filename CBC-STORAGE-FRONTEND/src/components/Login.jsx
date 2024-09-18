import { useState } from "react";
import { useLogin } from "../shared/hooks/useLogin";
import { RingLoader } from 'react-spinners';
import toast from "react-hot-toast";
import { Navigate } from 'react-router-dom';

const img = 'https://ideogram.ai/assets/image/lossless/response/K21yinLZTfCgO8s0aX3X7w';

export const Login = () => {
    const { login, isLoading } = useLogin();
    const [formData, setFormData] = useState({
        usuario: '',
        contrasena: ''
    });
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.usuario, formData.contrasena);

        if (success) {
            setRedirectToHome(true); 
        }
    };

    if (isLoading) {
        return (
            <div>
                <RingLoader />
            </div>
        );
    }

    if (redirectToHome) {
        return <Navigate to="/homePage" />;
    }

    return (
        <div>
            <img src={img} style={{ width: '5em', height: 'auto', borderRadius: '50% 0 50% 0' }} alt="Logo de login" />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario</label>
                    <input value={formData.usuario} onChange={handleChange} name="usuario" type="text" />
                    <div>We'll never share your usuario with anyone else.</div>
                </div>
                <div>
                    <label>Contraseña</label>
                    <input value={formData.contrasena} onChange={handleChange} name="contrasena" type="password" />
                </div>
                <div>
                    <input type="checkbox" />
                    <label>Check me out</label>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};