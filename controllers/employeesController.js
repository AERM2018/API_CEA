const User = require('../models/user');
const Employee = require('../models/employee');
const Time_tables = require('../models/time_tables');
const Emp_tim = require('../models/emp_tim');



const getAllEmployees = async (req, res) => {
    const employees = await Employee.findAll({
        where: { 'active': 1 }
    });

    return res.status(200).json({
        ok: true,
        employees
    })
}

const createEmployee = async (req, res) => {
    const { body } = req;
    const { user_type, email} = body;
    const { day, start_hour, finish_hour } = body;
    const { name, surname, rfc, curp, mobile_number, active } = body;
    let id_user, id_employee, id_time_table
    try {
        const user = new User({ user_type, email, password:"123456" });
        const newUser = await user.save()
        const userJson = newUser.toJSON();
        id_user = userJson['id_user']
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador",
        })
    }
    try {
        const time_table = new Time_tables({ day, start_hour, finish_hour })
        const newTimeTable = await time_table.save();
        const newTimeTableJson = newTimeTable.toJSON();
        id_time_table = newTimeTableJson['id_time_table']
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador",
        })
    }

    try {
        const employee = new Employee({ id_user, name, surname, rfc, curp, mobile_number, email, active });
        const newEmployee = await employee.save();
        const newEmployeeJson = newEmployee.toJSON();
        id_employee = newEmployeeJson['id_employee']
        const user = await User.findByPk(id_user);
        // password
        const user = await User.findByPk(id_user);
        const salt = bcrypt.genSaltSync();
        const pass = bcrypt.hashSync(id_employee,salt)

        await user.update({password:pass});
        

        await user.update({password:id_employee});
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador",
        })
    }

    try {
        const emp_tim = new Emp_tim({ id_employee, id_time_table });
        await emp_tim.save();
    } catch (error) {
        console.log(error)
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
                msg: "No existe un empleado con el id " + id,
            });
        }

        await employee.update(body);
        res.status(200).json({
            ok: true,
            msg: "El empleado se actualizo correctamente"
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}
const deleteEmployee = async (req, res) => {
    const { id } = req.params;


    const employee = await Employee.findByPk(id);
    if (!employee) {
        return res.status(404).json({
            msg: "No existe un empleado con el id " + id,
        });
    }

    await employee.update({ active: 0 })
    res.status(200).json({
        ok: true,
        msg: "El trabajador se elimino correctamente"
    })


}






module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
}