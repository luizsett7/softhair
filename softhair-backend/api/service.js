const moment = require('moment')

module.exports = app => {
    const getServices = (req, res) => {
            app.db('services')                    
                .orderBy('descricao')                       
                .then(services => res.json(services))
                .catch(err => res.status(400).json(err))               
    }

    const getAtiveServices = (req, res) => {
        app.db('services')                    
            .orderBy('descricao')
            .where('ativo', '=', '1')          
            .then(services => res.json(services))
            .catch(err => res.status(400).json(err))               
}

    const getService = (req, res) => {
        app.db('services') 
            .where({ serviceIdPK: req.params.id })                
            .orderBy('descricao')           
            .then(services => res.json(services))
            .catch(err => res.status(400).json(err))               
    }

    const save = (req, res) => {
        if (!req.body.descricao.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        
        app.db('services')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('services')
            .where({ serviceIdPK: req.params.id })
            .update({ ativo: 0 })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
            //.del()
            // .then(rowsDeleted => {
            //     if (rowsDeleted > 0) {
            //         res.status(204).send()
            //     } else {
            //         const msg = `Não foi encontrada task com id ${req.params.id}.`
            //         res.status(400).send(msg)
            //     }
            // })
            // .catch(err => res.status(400).json(err))
    }

    const seleciona = (req, res) => { 
        console.log(req.params.ativo)       
        app.db('services')
            .where({ serviceIdPK: req.params.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }
                const descricao = req.params.descricao                
                const valor = req.params.valor
                const ativo = req.params.ativo
                update(req, res, descricao, valor, ativo)
            })
            .catch(err => res.status(400).json(err))
    }

    const update = (req, res, descricao, valor, ativo) => {        
        app.db('services')
            .where({ serviceIdPK: req.params.id })
            .update({ descricao, valor, ativo })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { getServices, getService, getAtiveServices, save, remove, seleciona }
}
