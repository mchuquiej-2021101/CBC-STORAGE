'use strict'
import Prestamo from '../prestamo/prestamo.model.js'
import Herramienta from '../herramienta/herramienta.model.js'
import Empleado from '../empleado/empleado.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body;
       
        let herramienta = await Herramienta.findOne({ _id: data.herramienta });
        if (!herramienta) return res.status(404).send({ message: 'Herramienta no existente' });

        let empleado = await Empleado.findOne({ _id: data.empleado });
        if (!empleado) return res.status(404).send({ message: 'Empleado no existente' });
        
        data.fechaPrestamo = new Date();
        data.estado='NO DEVUELTO'

        let prestamo = new Prestamo(data);
        await prestamo.save();

        return res.send({ message: 'Préstamo guardado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al agregar préstamo' });
    }
};

export const get=async(req,res)=>{
    try {
        let prestamos=await Prestamo.find()
        if(prestamos.length==0) return res.status(404).send({message: 'No hay préstamos que mostrar'})
        return res.send({prestamos})
    } catch (error) {
        console.error(error)
        return res.stats(500).send({message: 'Error al obtener préstamos'})
    }
}

export const update=async(req,res)=>{
    try {
        let {id}=req.params
        let data=req.body
        let updatedPrestamo=await Prestamo.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        .populate('herramienta',['nombre'])
        .populate('empleado',['nombres'])

        if(!updatedPrestamo) return res.status(404).send({message: 'Préstamo no encontrado y/o no actualizado'})
        return res.send({message: 'Préstamo actualizado exitosamente',updatedPrestamo})            
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al actualizar préstamo'})
    }
}

export const deletePrestamo=async(req,res)=>{
    try {
        let {id}=req.params
        let deletedPrestamo=await Prestamo.deleteOne({_id: id})
        if(deletedPrestamo.deleteCount==0) return res.status(404).send({message: 'Prestamo no encontrado y/o no eliminado'})
        return res.send({message: 'El préstamo se eliminó exitosamente'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error al eliminar préstamo'})
    }
}
