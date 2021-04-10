const { Router } = require('express');
const { check, param } = require('express-validator');
const { getAllCards, createCard,updateCard, deleteCard } = require('../controllers/cardsController');

const validateJWT = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validateFields');
const campusRouter = require('./campus');

const cardsRouter = Router();

cardsRouter.get('/',[
    validateJWT
], getAllCards);

cardsRouter.post('/', [
    // check('id_card','').not.isEmpty.isLength( { max:  } ),
    check('id_payment','Id de Payment es obligatorio y tiene un número entero').notEmpty().isNumeric(),
    check('card_number','El número de tarjeta es obligatorio y debe tener como máximo 16 caracteres').not().isEmpty().isLength( { max: 16 } ),
    check('owner','El propietario de la tarjeta es obligatorio y debe tener como máximo 20 caracteres').not().isEmpty().isLength( { max:20  } ),
    check('bank','El banco al que pertenece la tarjeta es obligatorio y debe tener como máximo 20 caracteres').not().isEmpty().isLength( { max: 20 } ),
    check('due_date','La fecha de vencimiento de la tarjeta es obligatoria').isDate(),
    validateFields,
    validateJWT
],createCard);

cardsRouter.put('/:id',[
    param('id', 'El id de la tarjeta es obligatorio y debe ser número entero').isNumeric(),
    check('id_payment','Id de Payment es obligatorio y tiene un número entero').notEmpty().isNumeric(),
    check('card_number','El número de tarjeta es obligatorio y debe tener como máximo 16 caracteres').not().isEmpty().isLength( { max: 16 } ),
    check('owner','El propietario de la tarjeta es obligatorio y debe tener como máximo 20 caracteres').not().isEmpty().isLength( { max:20  } ),
    check('bank','El banco al que pertenece la tarjeta es obligatorio y debe tener como máximo 20 caracteres').not().isEmpty().isLength( { max: 20 } ),
    check('due_date','La fecha de vencimiento de la tarjeta es obligatoria').isDate(),
    validateFields,
    validateJWT
], updateCard);

campusRouter.delete('/id:',[
    param('id', 'El id de la tarjeta es obligatorio y debe ser número entero').isNumeric(),
    validateJWT
], deleteCard);


module.exports= cardsRouter;