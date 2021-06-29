
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const getUsers = (req, res) => {
        app.db('users')
            .leftJoin('roles', 'users.roleIdFK', '=', 'roles.roleIdPK')
            //.where({ ativo: 1 })
            .orderBy('name')
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err))
    }

    const getUser = (req, res) => {
        app.db('users')
            .where({ userIdPK: req.params.id })
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

    const remove = (req, res) => {     
        if (req.user.id === 1) {              
            app.db('users')
            .where({ userIdPK: req.params.id})
            .update({ ativo: 0 })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))                     
        } else {
            const msg = `Permissão Negada`
            res.status(400).send(msg)
        }
    }

    const update = (req, res) => {        
        const name = req.params.nome
        const email = req.params.email
        const roleIdFK = req.params.role
        const ativo = req.params.ativo
        console.log(roleIdFK)
        app.db('users')
            .where({ userIdPK: req.params.id })
            .update({ name, email, roleIdFK, ativo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { save, getUsers, getUser, remove, update }
}
