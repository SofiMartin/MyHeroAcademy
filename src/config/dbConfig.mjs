import mongoose from "mongoose";

export async function connectDB() {

    try {
        const url = 'mongodb+srv://Grupo-14:grupo14@cursadanodejs.ls9ii.mongodb.net/Node-js';
            await mongoose.connect(url, {});

        console.log('Conexión exitosa MongoDB');

    } catch (error) {
         console.error('Error al conectarse a MongoDB:', error);
         process.exit(1);
    }
    
    
}