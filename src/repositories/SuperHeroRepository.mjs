import IRepository from "./IRepository.mjs";
import SuperHero from "../models/SuperHero.mjs";
import mongoose from 'mongoose';

class SuperHeroRepository extends IRepository {


    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async insertSuperHero(superheroData) {
      try {
          const newHero = new SuperHero(superheroData);
          const saveHero = await newHero.save();
          return saveHero;
      } catch (error) {
          console.error("Error al insertar el superhéroe:", error);
          throw new Error("Error al insertar el superhéroe");
      }
  }

    async editarSuperHeroe(req, res) {
        const { id } = req.params; 
        const superheroeData = req.body; 

        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('ID no válido');
            }

            const objectId = new mongoose.Types.ObjectId(id); 
            const superheroe = await SuperHero.findByIdAndUpdate(
                objectId, 
                superheroeData, 
                { new: true } 
            );

            if (!superheroe) {
                throw new Error("Superhéroe no encontrado");
            }

            return superheroe;
        } catch (error) {
            console.error("Error al actualizar el superhéroe:", error.message);
            throw new Error("Error al actualizar el superhéroe");
        }
    }
  
    async borrarPorId(id) {
      try {
          if (!mongoose.Types.ObjectId.isValid(id)) {
              throw new Error('ID no válido');
          }

          const objectId = new mongoose.Types.ObjectId(id);
          const superheroe = await SuperHero.findByIdAndDelete(objectId);

          if (!superheroe) {
              throw new Error("Superhéroe no encontrado");
          }

          return superheroe;
      } catch (error) {
          console.error("Error al borrar el superhéroe:", error);
          throw new Error("Error al borrar el superhéroe");
      }
  }
  
  // Método para obtener un superhéroe por ID
async obtenerPorId(id) {
  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error('ID no válido');
      }

      const objectId = new mongoose.Types.ObjectId(id);
      const superheroe = await SuperHero.findById(objectId);

      if (!superheroe) {
          throw new Error("Superhéroe no encontrado");
      }

      return superheroe;
  } catch (error) {
      console.error("Error al obtener el superhéroe:", error);
      throw new Error("Error al obtener el superhéroe");
  }
}

}

export default new SuperHeroRepository();

