const { Router } = require('express');
const { check, param } = require('express-validator');
const {getAllGroups,createGroup,updateGroup,deleteGroup} = require('../controllers/groupsController');
const validateJWT = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validateFields');

const groupsRouter = Router();

groupsRouter.get('/', [
    validateJWT
], getAllGroups);

groupsRouter.post( '/',[
    check('id_major','el id de la cerrera es obligatorio y tiene que un numero entero').notEmpty().isNumeric(),
    check('name_group','el nombre del grupo es obligaotorio y tiene que tener como maximo 15 caracteres').not().isEmpty().length({max:15}),
    check('entry_year','el año de entrada es obligatorio').notEmpty().isDate(),
    check('end_year','el año de salida es obligatorio').notEmpty().isDate(),

    check('time_tables','los horarios deben de estar contenidos en un array').isArray(),
    validateFields,
    validateJWT
    
], createGroup);

groupsRouter.put( '/:id',[
    param('id','el id del grupo es obligatorio y debe ser un numero entero').isNumeric(),
    check('name_group','el nombre del grupo es obligaotorio y tiene que tener como maximo 15 caracteres').not().isEmpty().length({max:15}),
    check('entry_year','el año de entrada es obligatorio').notEmpty().isDate(),
    check('end_year','el año de salida es obligatorio').notEmpty().isDate(),
    validateFields,
    validateJWT

], updateGroup);

groupsRouter.delete( '/:id',[
    param('id','el id del grupo es obligatorio y debe ser un numero entero').isNumeric(),
    validateFields,
    validateJWT

], deleteGroup);

module.exports = groupsRouter;