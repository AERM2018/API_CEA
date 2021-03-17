const { Router } = require('express');
const { check, param } = require('express-validator');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeesController');
const validateJWT = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validateFields');

const employeesRouter = Router();

employeesRouter.get('/',[ 
    validateJWT
], getAllEmployees);
employeesRouter.post('/',[
    check('user_type','el tipo de usuario es obligatorio y tiene que tener como maximo 8 caracteres').not().isEmpty().isLength({max:8}),
    check('email','el email es obligatorio').notEmpty().isEmail(),
    check('name','el nombre del empleado es obligatorio y debe de tener como maximo 35 caracteres').not().isEmpty().isLength({max:35}),
    check('surname','Los apellidos son obligatorios y debe de tener como maximo 45 caracteres').not().isEmpty().isLength({max:45}),
    check('rfc','el RFC es obligatorio y tiene que tener como maximo 13 caracteres').not().isEmpty().isLength({max:13}),
    check('curp','el CURP es obligatorio y tiene que tener como maximo 18 caracteres').not().isEmpty().isLength({max:18}),
    check('mobile_number','el numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    check('active','al campo activo es obligatorio').isInt().exists({checkNull:true}),
    // Checar como guardar los horarios
    check('time_tables','los horarios deben de estar contenidos en un array').isArray(),
    /* check('day', 'el dia es obligatorio').notEmpty().isInt(),
    check('start_hour', 'la hora de inicio es obligatoria').notEmpty(),
    check('finish_hour','la hora de fin es obligatoria').notEmpty(), */
    validateFields,
    validateJWT

], createEmployee);
employeesRouter.put('/:id',[
    //ID CHECARSE
    param('id','el id del empleado es una cadena de texto y es obligatorio').isString().notEmpty(),
    check('name','el nombre del empleado es obligatorio y debe de tener como maximo 35 caracteres').not().isEmpty().isLength({max:35}),
    check('surname','Los apellidos son obligatorios y debe de tener como maximo 45 caracteres').not().isEmpty().isLength({max:45}),
    check('rfc','el RFC es obligatorio y tiene que tener como maximo 13 caracteres').not().isEmpty().isLength({max:13}),
    check('curp','el CURP es obligatorio y tiene que tener como maximo 18 caracteres').not().isEmpty().isLength({max:18}),
    check('mobile_number','el numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    check('active','al campo activo es obligatorio').isInt().exists({checkNull:true}),
    validateFields,
   validateJWT

], updateEmployee);
employeesRouter.delete('/:id', [
    //SAME 
    param('id','el id del empleado es una cadena de texto y es obligatorio').isString().notEmpty(),
    validateFields,
    validateJWT

],deleteEmployee);

module.exports = employeesRouter;