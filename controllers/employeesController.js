const User = require('../models/user');
const Employee = require('../models/employee');
const Time_tables = require('../models/time_tables');
const Emp_tim = require('../models/emp_tim');
const bcrypt = require('bcryptjs');
const Cam_use = require('../models/cam_use');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.findAll({
        where: { 'active': 1, }
    });


    return res.status(200).json({
        ok: true,
        employees,

    })
}

const createEmployee = async (req, res) => {
    const { body } = req;
    const { user_type, email } = body;
    const { time_tables, id_campus  } = body;
    const { name, surname, rfc, curp, mobile_number, active } = body;
    let id_user, id_employee
    let ids_emp_tim
    try {
        const user = new User({ user_type, email, password: "12345678" });
        const newUser = await user.save()
        const userJson = newUser.toJSON();
        id_user = userJson['id_user']
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        })
    }
    try {

        ids_emp_tim = time_tables.map(async (x) => {
            let { day, start_hour, finish_hour } = x;
            const time = await Time_tables.findAll({
                where: { 'day': day, 'start_hour': start_hour, 'finish_hour': finish_hour }
            });
            if (time.length < 1) {
                const time_table = new Time_tables({ day, start_hour, finish_hour })
                const newTime_Table = await time_table.save();
                const newTime_tableJson = newTime_Table.toJSON();
                id_time_table = newTime_tableJson['id_time_table']
                return id_time_table;
            } else {
                return time[0].id_time_table
            }

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        })
    }

    try {
        //creation of id_employee
        const name1 = name.split(" ")
        const name2 = surname.split(" ")
        id_employee = `ale${id_user}.${name1[0]}.${name2[0]}`
        //creating employee
        const employee = new Employee({ id_employee, id_user, name, surname, rfc, curp, mobile_number, active });
        const newEmployee = await employee.save();
        const newEmployeeJson = newEmployee.toJSON();
        id_employee = newEmployeeJson['id_employee']
        const user = await User.findByPk(id_user);
        // creation of password
        const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync(id_employee, salt)

        await user.update({ password: pass });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador",
        })
    }

    try {

        ids_emp_tim.forEach(async (x) => {
            id_time_table = await x
            const emp_tim = new Emp_tim({ id_employee, id_time_table });
            await emp_tim.save();

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        })
    }
    try {
       //campus
        const cam_use = new Cam_use({id_campus,id_user});
        await cam_use.save();


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        })
    }


    res.status(201).json({
        ok: true,
        msg: "empleado creado correctamente"
    })

}
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un empleado con el id " + id,
            });
        }

        await employee.update(body);


        res.status(200).json({
            ok: true,
            msg: "El empleado se actualizo correctamente",

        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
        return res.status(404).json({
            ok: false,
            msg: "No existe un empleado con el id " + id,
        });
    }

    await employee.update({ active: 0 })


    res.status(200).json({
        ok: true,
        msg: "El trabajador se elimino correctamente",

    })


}






module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}