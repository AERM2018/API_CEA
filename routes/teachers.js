const { Router } = require('express');
const { check, param } = require('express-validator');
const { getAllTeachers,createTeacher,updateTeacher,deleteTeacher} = require('../controllers/teacherController');
const validateJWT = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validateFields');

const teachersRouter = Router();

teachersRouter.get('/',[
    validateJWT
 ], getAllTeachers);


teachersRouter.post('/',[
    check('user_type','el tipo de usuario es obligatorio y tiene que tener como maximo 8 caracteres').not().isEmpty().isLength({max:8}),
    check('email','el email es obligatorio').notEmpty().isEmail(),
    check('name','el nombre del profesor es obligatorio y debe de tener como maximo 35 caracteres').not().isEmpty().length({max:35}),
    check('surname','Los apellidos son obligatorios y debe de tener como maximo 45 caracteres').not().isEmpty().length({max:45}),
    check('rfc','el RFC es obligatorio y tiene que tener como maximo 13 caracteres').not().isEmpty().length({max:13}),
    check('mobile_number','el numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().length({max:10}),
    check('id_ext_cou','El id de curso extracurricular es obligatorio'),
    check('courses','El campo curso son obligatorios').isInt().exists({checkNull:true}),
    check('active','el campo activo es obligatorio').isInt().exists({checkNull:true}),
    check('id_courses', 'Los ids de los cursos son obligatoris y deben de estar contenidos en un array').notEmpty().isArray(),
    check('status','El estatus es obligatorio').isBoolean(),
    check('start_date','La fecha de entrada es obligatoria').notEmpty().isDate(),
    check('end_date','La fecha de salida es obligatoria').notEmpty().isDate(),
    validateFields,
    validateJWT

], createTeacher);


teachersRouter.put('/:id',[
    param('id','el id del maestro tiene que ser una cadena de texto y es obligatoria ').isString().notEmpty(),
    check('name','el nombre del profesor es obligatorio y debe de tener como maximo 35 caracteres').not().isEmpty().length({max:35}),
    check('surname','Los apellidos son obligatorios y debe de tener como maximo 45 caracteres').not().isEmpty().length({max:45}),
    check('rfc','el RFC es obligatorio y tiene que tener como maximo 13 caracteres').not().isEmpty().length({max:13}),
    check('mobile_number','el numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().length({max:10}),
    check('id_ext_cou','El id de curso extracurricular es obligatorio').isInt(),
    check('courses','El campo curso son obligatorios').isInt().exists({checkNull:true}),
    check('active','el campo activo es obligatorio').isInt().exists({checkNull:true}),
    
    
    validateFields,
    validateJWT

], updateTeacher);
teachersRouter.delete('/:id',[
    param('id','el id del maestro tiene que ser una cadena de texto y es obligatoria ').isString().notEmpty(),
    validateFields,
    validateJWT
], deleteTeacher);

module.exports = teachersRouter;