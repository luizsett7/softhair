const moment = require('moment')

module.exports = app => {
    const getEmployees = (req, res) => {
            app.db('employees')                    
                .orderBy('nome')           
                .then(employees => res.json(employees))
                .catch(err => res.status(400).json(err))               
    }

    const save = (req, res) => {
        if (!req.body.nome.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        
        app.db('employees')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('employees')
            .where({ id: req.params.id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrada task com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const seleciona = (req, res) => {
        app.db('employees')
            .where({ id: req.params.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }
                const nome = req.params.nome                
                const cargo = req.params.cargo
                update(req, res, nome, cargo)
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, nome, cargo) => {        
        app.db('employees')
            .where({ id: req.params.id })
            .update({ nome, cargo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }

    return { getEmployees, save, remove, seleciona, toggleTask }
}
