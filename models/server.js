const express = require('express');
const cors = require('cors');
const statesRouter = require('../routes/states');
const municipalitiesRouter = require('../routes/municipalities');
const campusRouter = require('../routes/campus');
const coursesRouter = require('../routes/courses');
const scholarshipRouter = require('../routes/scholarships');
const gradesRouter = require('../routes/grades');
const authRouter = require('../routes/auth');


const majorsRouter=require('../routes/majors');
const departmentsRouter=require('../routes/departments');
const employeesRouter=require('../routes/employees');
const groupsRouter=require('../routes/groups');
const studentsRouter= require('../routes/students');
const teachersRouter = require('../routes/teachers');
const cardsRouter = require('../routes/cards');
const paymentsRouter = require('../routes/payments');
const requestRouter = require('../routes/request');
class Server{

    app = express.application;
    base = '';
    port = '';
    apiPaths = {};

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.middlewares();
        this.base = 'api-ale/v1'
        this.apiPaths = {
            index : '/',
            auth : `/${this.base}/auth`,
            states : `/${this.base}/states`,
            municipalities : `/${this.base}/municipalities`,
            campus : `/${this.base}/campus`,
            courses : `/${this.base}/courses`,
            scholarships : `/${this.base}/scholarships`,
            grades : `/${this.base}/grades`,
            majors : `/${this.base}/majors`,
            departments: `/${this.base}/departments`,
            employees: `/${this.base}/employees`,
            groups: `/${this.base}/groups`,
            students: `/${this.base}/students`,
            teachers: `/${this.base}/teachers`,
            cards: `/${this.base}/cards`,
            payments: `/${this.base}/payments`,
            requests: `/${this.base}/requests`,
        }
        this.routes();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.urlencoded({extended:true}));
    }

    routes(){
        this.app.use(this.apiPaths.auth,authRouter);
        this.app.use(this.apiPaths.states, statesRouter);
        this.app.use(this.apiPaths.municipalities, municipalitiesRouter);
        this.app.use(this.apiPaths.campus, campusRouter);
        this.app.use(this.apiPaths.courses, coursesRouter);
        this.app.use(this.apiPaths.scholarships, scholarshipRouter);
        this.app.use(this.apiPaths.grades, gradesRouter);

        this.app.use(this.apiPaths.campus, campusRouter)
        this.app.use(this.apiPaths.majors, majorsRouter)
        this.app.use(this.apiPaths.departments, departmentsRouter)
        this.app.use(this.apiPaths.employees, employeesRouter)
        this.app.use(this.apiPaths.groups, groupsRouter)
        this.app.use(this.apiPaths.students, studentsRouter)
        this.app.use(this.apiPaths.teachers, teachersRouter)
        this.app.use(this.apiPaths.cards, cardsRouter)
        this.app.use(this.apiPaths.payments, paymentsRouter)
        this.app.use(this.apiPaths.requests, requestRouter)
        this.app.use(this.apiPaths.index, (req, res) => {
            res.send('Hola mundo')
        })

    }
    listen(){
        this.app.listen( this.port, () => {
            console.log(`server listening on the port ${this.port}`)
        })
    }
    
}

module.exports = Server;