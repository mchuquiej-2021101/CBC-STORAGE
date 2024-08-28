'use strict'

import Empleado from './empleado.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body;
        
        const requiredFields = ['nombres', 'apellidos', 'email', 'telefono']; 
                
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).send({ message: `El campo ${field} es obligatorio` });
            }
        }
        
        //Validación para que el teléfono sea diferente
        let telefonoEncontrado = await Empleado.find({ telefono: data.telefono });
        if (telefonoEncontrado.length > 0) {
            return res.status(400).send({ message: 'El número de teléfono ya está asignado a otra persona' });
        }

        //Validación para que el email sea diferente
        let emailEncontrado=await Empleado.find({email: data.email})
        if(emailEncontrado.length>0){
            return res.status(400).send({message: 'El email ya está asignado a otra persona'})
        }
                
        let empleado = new Empleado(data);
        await empleado.save();
        return res.send({ message: 'Empleado guardado exitosamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error guardando empleado' });
    }
}



export const get= async(req,res)=>{
    try {
        let empleados=await Empleado.find()
        if(empleados.length==0) return res.status(500).send({message: 'No hay empleados que mostrar'})
        return res.send({empleados})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al obtener empleados'})
    }
}

export const update=async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body

        let updatedEmpleado=await Empleado.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!updatedEmpleado) return res.status(404).send({message: 'Empleado no encontrado y no actualizado'})

        return res.send({message: 'Empleado actualizado exitosamente', updatedEmpleado})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al actualizar empleado'})
    }
}

export const deleteEmpleado = async (req, res) => {
    try {
        let { id } = req.params;
                
        let deletedEmpleado = await Empleado.deleteOne({ _id: id });
                
        if (deletedEmpleado.deletedCount === 0) {
            return res.status(404).send({ message: 'Empleado no encontrado y no eliminado' });
        }
        
        return res.send({ message: 'Empleado eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar empleado' });
    }
}


export const search = async (req, res) => {
    try {
        let { search } = req.body;
        
        let empleados = await Empleado.find({
            nombres: { $regex: search, $options: 'i' }
        });

        if (empleados.length == 0) {
            return res.status(404).send({ message: 'Empleado no encontrado' });
        }

        return res.send({ message: 'Empleado encontrado', empleados });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al buscar empleado' });
    }
}
