const { sign } = require('jsonwebtoken');
const createJWT = (id_user, user_type, id_role) => {
    return new Promise((resolve, reject) => {
        const payload = { id_user, user_type, id_role }
        sign(payload, process.env.SECRET_JWT, {
            expiresIn: '1m'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })

}


module.exports = {
    createJWT
}