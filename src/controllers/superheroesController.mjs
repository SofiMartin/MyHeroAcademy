import mongoose from 'mongoose'; // Asegúrate de importar mongoose
import { obtenerTodosLosSuperHeroes, insertarSuperHeroes, actualizarSuperHeroes, borrarSuperHeroePorId } from '../services/SuperHeroService.mjs';
import { renderizarSuperHeroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import { validationResult } from 'express-validator';
import SuperHero from '../models/SuperHero.mjs';

// Extrae ObjectId de mongoose
const { ObjectId } = mongoose.Types;


//JSON
export async function obtenerTodosLosSuperHeroesController(req, res) {
  try {
      const superheroes = await obtenerTodosLosSuperHeroes();
      res.json(superheroes); 
  } catch (error) {
      console.error('Error al obtener superhéroes:', error);
      res.status(500).send('Error interno del servidor');
  }
}
// Dashboard
export async function obtenerTodosLosSuperHeroesDashboardController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperHeroes();
    res.render('dashboard', { superheroes });
  } catch (error) {
    console.error('Error al obtener superhéroes:', error);
    res.status(500).send('Error interno del servidor');
  }
}

//Insertar heroes
export async function insertarSuperHeroesController(req, res) {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
  }

  const superheroData = {
      nombreSuperHeroe: req.body.nombreSuperHeroe,
      nombreReal: req.body.nombreReal,
      edad: req.body.edad,
      planetaOrigen: req.body.planetaOrigen,
      debilidad: req.body.debilidad,
      poderes: req.body.poderes.split(',').map(poder => poder.trim()),
      aliados: req.body.aliados.split(',').map(aliado => aliado.trim()),
      enemigos: req.body.enemigos.split(',').map(enemigo => enemigo.trim()),
  };

  try {
      // Inserta el superhéroe
      await insertarSuperHeroes(superheroData);

      // Almacena el mensaje en la sesión
      req.flash('success_msg', 'Superhéroe creado exitosamente');

      // Redirige al dashboard después de crear el superhéroe
      res.redirect('/dashboard'); // Asegúrate de que esta ruta esté configurada
  } catch (error) {
      console.error("Error en el controlador:", error.message);
      res.status(500).json({ error: "Error al insertar el superhéroe" });
  }
}
//Editar heroes
export async function editarSuperHeroesController(req, res) {
  console.log('Datos recibidos:', req.body);
  console.log('ID del superhéroe:', req.params.id);
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
  }

  const { id } = req.params;
  const superheroeData = {
    ...req.body,
    poderes: req.body.poderes.split(',').map(poder => poder.trim()),
    aliados: req.body.aliados.split(',').map(aliado => aliado.trim()),
    enemigos: req.body.enemigos.split(',').map(enemigo => enemigo.trim())
  };

  try {
    const superheroe = await actualizarSuperHeroes(id, superheroeData);
    if (!superheroe) {
        return res.status(404).send({ error: 'Superhéroe no encontrado' });
    }
    
    req.flash('success_msg', 'Superhéroe actualizado exitosamente');
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Error en el controlador:", error.message);
    res.status(500).send({ error: "Error al actualizar el superhéroe" });
  }
}
//borrar heroes
export async function borrarSuperHeroePorIdController(req, res) {
  console.log('Controlador de eliminación llamado');
  console.log('ID del superhéroe:', req.params.id);

  try {
    const { id } = req.params;
    const superheroe = await superHeroRepository.borrarPorId(id);
    
    if (!superheroe) {
      console.log('Superhéroe no encontrado');
      return res.status(404).json({ error: 'Superhéroe no encontrado' });
    }

    req.flash('success_msg', 'Superhéroe eliminado exitosamente');
    res.redirect('/dashboard');
  } catch (error) {
    console.error("Error en el controlador de eliminación:", error);
    res.status(500).json({ error: "Error al borrar el superhéroe" });
  }
}

// Obtener superhéroe por ID
export const obtenerSuperHeroePorIdController = async (req, res) => {
  const superheroeId = req.params.id;

  // Verificar si el ID es un ObjectId válido
  if (!ObjectId.isValid(superheroeId)) {
      return res.status(400).send('ID no válido');
  }

  try {
      const superheroe = await SuperHero.findById(new ObjectId(superheroeId)); // Cambiar aquí
      if (!superheroe) {
          return res.status(404).send('Superhéroe no encontrado');
      }
      res.render('editSuperhero', { superheroe });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al obtener el superhéroe');
  }
};



