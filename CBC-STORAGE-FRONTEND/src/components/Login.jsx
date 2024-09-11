import { useState } from "react";
import { useLogin } from "../shared/hooks/useLogin";
import {RingLoader} from 'react-spinners'
import toast from "react-hot-toast";

const img = 'https://ideogram.ai/assets/image/lossless/response/K21yinLZTfCgO8s0aX3X7w'

export const Login=()=>{
    const {login, isLoading} = useLogin()
    const [formData, setFormData] =useState({
        usuario: '',
        contrasena: ''
    })

    const handleChange=(e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        login(
            formData.usuario,
            formData.contrasena
        )
    }

    if(isLoading){
        return(
            <div>
                <RingLoader />
            </div>
        )
    }

    return (
        <div>
          <img src={img} style={{width: '5em', height: 'auto', borderRadius: '50% 0 50% 0'}} alt="Logo de login" />
          <form onSubmit={handleSubmit}> 
            <div>
              <label >usuario</label>
              <input value={formData.usuario} onChange={handleChange} name="usuario" type="text"/>
                <div>We'll never share your usuario with anyone else.</div>
            </div>
            <div>
              <label >contrasena</label>
              <input value={formData.contrasena} onChange={handleChange} name="contrasena" type="password" />
            </div>
            <div >
              <input type="checkbox" />
                <label>Check me out</label>
            </div>
            <div >
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )
}

