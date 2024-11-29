import { body } from 'express-validator';

export const validarSuperheroe = [
    body('nombreSuperHeroe')
        .trim()
        .notEmpty().withMessage('Por favor, ingresa el nombre del superhéroe.')
        .isLength({ min: 3 }).withMessage('El nombre del superhéroe debe tener al menos 3 caracteres.')
        .isLength({ max: 60 }).withMessage('El nombre del superhéroe no puede tener más de 60 caracteres.'),

    body('nombreReal')
        .trim()
        .notEmpty().withMessage('Por favor, ingresa el nombre real del superhéroe.')
        .isLength({ min: 3 }).withMessage('El nombre real debe tener al menos 3 caracteres.')
        .isLength({ max: 60 }).withMessage('El nombre real no puede tener más de 60 caracteres.'),

    body('edad')
        .notEmpty().withMessage('Por favor, ingresa la edad del superhéroe.')
        .isInt({ min: 0 }).withMessage('La edad debe ser un número entero no negativo.'),

    body('poderes')
        .notEmpty().withMessage('Por favor, ingresa los poderes del superhéroe.')
        .isString().withMessage('Los poderes deben ser una cadena de texto.')
        .custom((poderes) => {
            const poderesArray = poderes.split(',').map(poder => poder.trim());
            if (poderesArray.length < 1) {
                throw new Error('Debes proporcionar al menos un poder.');
            }
            if (!poderesArray.every(poder => poder.length >= 3 && poder.length <= 60)) {
                throw new Error('Cada poder debe tener entre 3 y 60 caracteres.');
            }
            return true;
        }),
];