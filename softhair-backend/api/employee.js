const moment = require('moment')

module.exports = app => {
    const getEmployees = (req, res) => {
            app.db('clients')                    
                .orderBy('nome')           
                .then(employees => res.json(employees))
                .catch(err => res.status(400).json(err))               
    }

    const getEmployee = (req, res) => {
        app.db('clients') 
            .where({ clientIdPK: req.params.id })                
            .orderBy('nome')           
            .then(employees => res.json(employees))
            .catch(err => res.status(400).json(err))               
    }

    const getAtiveEmployees = (req, res) => {
        app.db('clients') 
            .where({ ativo: 1 })                
            .orderBy('nome')           
            .then(employees => res.json(employees))
            .catch(err => res.status(400).json(err))               
    }

    const save = (req, res) => {
        if (!req.body.nome.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        
        app.db('clients')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('clients')
            .where({ clientIdPK: req.params.id })            
            .update({ ativo: 0 })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const seleciona = (req, res) => {        
        console.log(req.params.id)
        app.db('clients')
            .where({ clientIdPK: req.params.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }
                const nome = req.params.nome                
                const cargo = req.params.cargo
                const ativo = req.params.ativo
                update(req, res, nome, cargo, ativo)
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, nome, cargo, ativo) => {        
        app.db('clients')
            .where({ clientIdPK: req.params.id })
            .update({ nome, cargo, ativo })
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

    return { getEmployees, getEmployee, getAtiveEmployees, save, remove, seleciona, toggleTask }
}
