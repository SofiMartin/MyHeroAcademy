import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";
import SuperHero from '../models/SuperHero.mjs';

export async function obtenerTodosLosSuperHeroes() {
    return await SuperHeroRepository.obtenerTodos();
}

export async function insertarSuperHeroes(superheroData) {
  return await SuperHeroRepository.insertSuperHero(superheroData);
}

export async function actualizarSuperHeroes(id, datosActualizados) {
  try {
    console.log('Actualizando superhéroe con ID:', id);
    console.log('Datos de actualización:', datosActualizados);
    
    const superheroe = await SuperHero.findByIdAndUpdate(
      id, 
      datosActualizados, 
      { new: true, runValidators: true }
    );
    
    console.log('Superhéroe actualizado:', superheroe);
    return superheroe;
  } catch (error) {
    console.error('Error al actualizar superhéroe:', error);
    throw error;
  }
}

export async function borrarSuperHeroePorId(id) {
  try {
      return await superHeroRepository.borrarPorId(id);
  } catch (error) {
      throw error;
  }
}


