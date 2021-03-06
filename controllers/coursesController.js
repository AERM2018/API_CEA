const { response } = require("express")
const Course = require("../models/courses")
const { db } = require("../database/connection")
const { QueryTypes } = require("sequelize")
const { getCourses } = require("../queries/queries")
const Major = require("../models/major")

const getAllCourses = async (req, res = response) => {

    
    const courses = await db.query(
        getCourses,{ type : QueryTypes.SELECT}
    )
    
    
    res.status(200).json({
        ok: true,
        courses
    })
}

const createCourse = async (req, res = response) => {

    const { body } = req;
    const { id_major , course_name} = body

    try {

        // Check if the major exist
        const major = await Major.findOne({
            where : { 'id_major' : body.id_major }
        })
        if (!major) {
            return res.status(404).json({
                ok: false,
                msg: 'La carrera seleccionada no existe'
            })
        }

        // Avoid duplicates
        const courseMajor = await Course.findOne({ 
            where : {
                id_major,
                course_name
            }
        })

        if(courseMajor){
            return res.status(400).json({
                ok: false,
                msg: 'En la carrera ya esta registrado un curso con ese nombre'
            })
        }
        //  Create and save course
        const course = new Course(body);
        await course.save();

        res.status(201).json({
            ok: true,
            msg: 'Curso creado correctamente'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const updateCourse = async (req, res = response) => {
    const { id } = req.params
    const { body } = req;
    const { id_major , course_name} = body

    try {
        // Check if the record exists before updating
        const course = await Course.findByPk(id)
        if (!course) {
            return res.status(404).json({
                ok : false,
                msg : `El curso con id ${id} no existe, verifiquelo por favor.`
            })
        }

        // Check if the major exist
        const major = await Major.findOne({
            where : { 'id_major' : body.id_major }
        })
        if (!major) {
            return res.status(404).json({
                ok: false,
                msg: 'La carrera seleccionada no existe'
            })
        }

        // Avoid duplicates
        const courseMajor = await Course.findOne({ 
            where : {
                id_major,
                course_name
            }
        })

        if(courseMajor){
            return res.status(400).json({
                ok: false,
                msg: 'En la carrera ya esta registrado un curso con ese nombre'
            })
        }
        // Update record in the database
        await Course.update(body, {
            where: { 'id_course': id }
        })

        return res.status(200).json({
            ok : true,
            msg : 'Curso actualizado correctamente'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        })
    }
}

const deleteCourse = async( req, res = response) => {
    const { id } = req.params

    try{
        const course = await Course.findByPk( id );
        
        // Check if the course exists
        if( !course ){
            return res.status(404).json({
                ok : false,
                msg : `El curso con id ${id} no existe, verifiquelo por favor.`
            })
        }
    
        // Delete the record of the course
        await course.destroy()
    
        res.status(200).json({
            ok : true,
            msg : 'Curso eliminado correctamente'
        })

    }catch( err ){
        console.log(err)
        return res.status(500).json({
            ok : false,
            msg : 'Hable con el administrador'
        })
    }

}

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
}