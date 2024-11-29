import express from 'express';
import { 
    obtenerTodosLosSuperHeroesController,
    insertarSuperHeroesController, 
    editarSuperHeroesController, 
    borrarSuperHeroePorIdController,
    obtenerSuperHeroePorIdController,
    obtenerTodosLosSuperHeroesDashboardController 
} from '../controllers/superheroesController.mjs';
import { validarSuperheroe } from '../validators/superheroeValidator.mjs';

const router = express.Router();

// Ruta para obtener todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperHeroesController); // Agregada esta línea

// Ruta para insertar un superhéroe con validaciones
router.post('/heroes', validarSuperheroe, insertarSuperHeroesController);

// Ruta para editar un superhéroe con validaciones
router.put('/heroes/edit/:id', validarSuperheroe, editarSuperHeroesController);

// Ruta para borrar un superhéroe por ID
router.delete('/heroes/delete/:id', borrarSuperHeroePorIdController);

// Ruta para obtener un superhéroe específico por ID (nueva ruta)
router.get('/editSuperhero/:id', obtenerSuperHeroePorIdController); // Ruta para mostrar el formulario de edición

export default router;
