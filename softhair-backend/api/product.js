const moment = require('moment')

module.exports = app => {
    const getProducts = (req, res) => {
            app.db('products')                    
                .orderBy('descricao')           
                .then(employees => res.json(employees))
                .catch(err => res.status(400).json(err))               
    }

    const getProduct = (req, res) => {
        app.db('products') 
            .where({ productIdPK: req.params.id })                
            .orderBy('descricao')           
            .then(employees => res.json(employees))
            .catch(err => res.status(400).json(err))               
    }

    const save = (req, res) => {
        if (!req.body.descricao.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        
        app.db('products')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('products')
            .where({ productIdPK: req.params.id })
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
        console.log("-----------"+req.params.id)
        app.db('products')
            .where({ productIdPK: req.params.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }
                const descricao = req.params.descricao                
                const valor = req.params.valor
                const urlImage = req.params.url                
                update(req, res, descricao, valor, urlImage)
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, descricao, valor, urlImage) => {        
        app.db('products')
            .where({ productIdPK: req.params.id })
            .update({ descricao, valor, urlImage })
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

    return { getProducts, getProduct, save, remove, seleciona, toggleTask }
}
