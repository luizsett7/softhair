const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        if (req.user.id === 27) {
            app.db('tasks')    
                .where('estimateAt', '<=', date)
                .orderBy('estimateAt')           
                .then(tasks => res.json(tasks))
                .catch(err => res.status(400).json(err))            
        } else {
            app.db('tasks')
                .where({ userId: req.user.id })
                .where('estimateAt', '<=', date)
                .orderBy('estimateAt')
                .then(tasks => res.json(tasks))
                .catch(err => res.status(400).json(err))
        }
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
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
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const desc = req.params.descricao
                const estimateAt = req.params.estimateat
                const doneAt = req.params.doneat
                update(req, res, desc, estimateAt, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, desc, estimateAt, doneAt) => {
        //estimateAt = '2021-06-03 19:14:42.465-03'
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ desc, estimateAt, doneAt })
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

    return { getTasks, save, remove, seleciona, toggleTask }
}
