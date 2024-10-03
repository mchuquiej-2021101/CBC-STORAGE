'use strict'
import mongoose from "mongoose"

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ada_user:ada123*@kinalbcluster.jllve.mongodb.net/cbc-storage?retryWrites=true&w=majority&appName=KinalBCluster';

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => console.log('MongoDB | try connecting'));
        mongoose.connection.on('connected', () => console.log('MongoDB | connected to mongodb'));
        mongoose.connection.on('open', () => console.log('MongoDB | connected to database'));
        mongoose.connection.on('disconnected', () => console.log('MongoDB | disconnected'));
        mongoose.connection.on('reconnected', () => console.log('MongoDB | reconnected to mongodb'));

        return await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }); // Añadir opciones de conexión
    } catch (error) {
        console.error('Database connection failed', error);
    }
}
