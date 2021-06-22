const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        if (req.user.id === 1) {
            app.db('tasks')    
                .leftJoin('clients', 'tasks.clientIdFK', '=', 'clients.clientIdPK')
                .leftJoin('users', 'tasks.userIdFK', '=', 'users.userIdPK')
                .where('tasks.estimateAt', '<=', date)
                .orderBy('tasks.estimateAt')           
                .then(tasks => res.json(tasks),                
                )
                .catch(err => res.status(400).json(err))                            
        } else {
            app.db('tasks')
                .leftJoin('clients', 'tasks.clientIdFK', '=', 'clients.clientIdPK')
                .leftJoin('users', 'tasks.userIdFK', '=', 'users.userIdPK')
                .where({ userId: req.user.id })
                .where('tasks.estimateAt', '<=', date)
                .orderBy('tasks.estimateAt')
                .then(tasks => res.json(tasks))
                .catch(err => res.status(400).json(err))
        }
    }

    const getTask = (req, res) => {
            app.db('tasks')
                .where({ taskIdPK: req.params.id })                
                .orderBy('estimateAt')
                .then(tasks => res.json(tasks))
                .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }
        console.log(req.body)
        req.body.userIdFK = req.user.id            
        let dataMenor = moment(req.body.doneAt).subtract(30, 'minutes')
        let dataInicial = moment(dataMenor).format()
        let dataMaior = moment(req.body.doneAt).add(30, 'minutes')
        let dataFinal = moment(dataMaior).format()
        console.log("dataMenor"+moment(dataInicial).format())
        console.log("dataMaior"+moment(dataFinal).format())
        console.log(req.body.estimateAt)                
                app.db('tasks')
                .where('userIdFK', '=', `${req.body.userIdFK}`)                                
                .where('doneAt', '>=', `${dataInicial}`) 
                .where('doneAt', '<=', `${dataFinal}`)           
                .first() 
                .then((row) => {                                        
                    if(row == undefined){ 
                        console.log("insert")
                        app.db('tasks')
                        .insert(req.body)
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(400).json(err)) 
                    }else{                   
                        console.log("existe")                       
                        return res.status(400).json("Agendamento não permitido")                                                                       
                    }
                })
    }

    const remove = (req, res) => {
        app.db('tasks')
            //.where({ taskIdPK: req.params.id, userIdFK: req.user.id })
            .where({ taskIdPK: req.params.id })
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
        console.log("**********"+req.params.id)
        app.db('tasks')
            //.where({ taskIdPK: req.params.id, userIdFK: req.user.id })
            .where({ taskIdPK: req.params.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id} não encontrada.`
                    return res.status(400).send(msg)
                }

                const desc = req.params.descricao
                const estimateAt = req.params.estimateat
                const doneAt = req.params.doneat
                const clientIdFK = req.params.employee
                const userIdFK = req.params.usuario                
                update(req, res, desc, estimateAt, doneAt, clientIdFK, userIdFK)
            })
    }

    const update = (req, res, desc, estimateAt, doneAt, clientIdFK, userIdFK) => {
        //estimateAt = '2021-06-03 19:14:42.465-03'
        app.db('tasks')
            //.where({ taskIdPK: req.params.id, userIdFK: req.user.id })
            .where({ taskIdPK: req.params.id })
            .update({ desc, estimateAt, doneAt, userIdFK, clientIdFK })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ taskIdPK: req.params.id, userIdFK: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ taskIdPK: req.params.id, userId: req.user.id })
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

    return { getTasks, getTask, save, remove, seleciona, toggleTask }
}
