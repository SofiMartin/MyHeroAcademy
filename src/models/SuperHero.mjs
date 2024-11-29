import mongoose from "mongoose";

const superheroeSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creado: { type: String, default: 'Sofia' },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-14' });

export default mongoose.model('SuperHero', superheroeSchema);