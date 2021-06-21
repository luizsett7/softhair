
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const getUsers = (req, res) => {
        app.db('users')                    
            .orderBy('name')           
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err))               
}

    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash

            app.db('users')
                .insert({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password,
                    roleIdFK: req.body.role
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    return { save, getUsers }
}
