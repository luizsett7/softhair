const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        if (req.user.id === 1) {
            app.db('tasks')
                .leftJoin('clients', 'tasks.clientIdFK', '=', 'clients.clientIdPK')
                .leftJoin('users', 'tasks.userIdFK', '=', 'users.userIdPK')
                .leftJoin('services', 'tasks.serviceIdFK', '=', 'services.serviceIdPK')
                .where('tasks.estimateAt', '<=', date)
                .orderBy('tasks.estimateAt')
                .then(tasks => res.json(tasks),
            )
                .catch(err => res.status(400).json(err))
        } else {
            app.db('tasks')
                .leftJoin('clients', 'tasks.clientIdFK', '=', 'clients.clientIdPK')
                .leftJoin('users', 'tasks.userIdFK', '=', 'users.userIdPK')
                .leftJoin('services', 'tasks.serviceIdFK', '=', 'services.serviceIdPK')
                .where({ userIdFK: req.user.id })
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
        console.log(req.body.doneAt)
        //req.body.userIdFK = req.user.id
        let horaAtual = moment("2021-07-03T" + req.body.doneAt + "-03:00").format()
        let horaMaior = moment(horaAtual).add(30, 'minutes')
        let horaMenor = moment(horaAtual).subtract(30, 'minutes')
        horaMaior = moment(horaMaior).format("HH:mm:ss")
        horaMenor = moment(horaMenor).format("HH:mm:ss")
        let data = moment(req.body.estimateAt).format("YYYY-MM-DD")
        console.log(data)
        console.log(horaMaior)
        app.db('tasks')
            .where('estimateAt', '=', `${data}`)
            .andWhere('doneAt', '>=', `${horaMenor}`)
            .andWhere('doneAt', '<=', `${horaMaior}`)
            .first()
            .then((row) => {
                if (row == undefined) {
                    console.log("insert")
                    app.db('tasks')
                        .insert(req.body)
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(400).json(err))
                } else {
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
                let estimateAt = req.params.estimateat
                let doneAt = req.params.doneat
                const clientIdFK = req.params.employee
                const userIdFK = req.params.usuario
                const serviceIdFK = req.params.service
                update(req, res, desc, estimateAt, doneAt, clientIdFK, userIdFK, serviceIdFK)
            })
    }

    const update = (req, res, desc, estimateAt, doneAt, clientIdFK, userIdFK, serviceIdFK) => {
        console.log(req.params.id, desc, estimateAt, doneAt, clientIdFK, userIdFK, serviceIdFK)
        let horaAtual = doneAt
        let hora = moment(horaAtual).format("HH:mm:ss")
        let horaMaior = moment(horaAtual).add(30, 'minutes')
        let horaMenor = moment(horaAtual).subtract(30, 'minutes')
        horaMaior = moment(horaMaior).format("HH:mm:ss")
        horaMenor = moment(horaMenor).format("HH:mm:ss")
        let data = moment(estimateAt).format("YYYY-MM-DD")
        estimateAt = data
        doneAt = hora
        console.log("Hora"+doneAt)
        // app.db('tasks')
        //     //.where({ taskIdPK: req.params.id, userIdFK: req.user.id })
        //     .where({ taskIdPK: req.params.id })
        //     .update({ desc, estimateAt, doneAt, userIdFK, clientIdFK, serviceIdFK })
        //     .then(_ => res.status(204).send())
        //     .catch(err => res.status(400).json(err))
        app.db('tasks')
            .where('taskIdPK', '<>', `${req.params.id}`)
            .andWhere('estimateAt', '=', `${data}`)            
            .andWhere('doneAt', '>=', `${horaMenor}`)
            .andWhere('doneAt', '<=', `${horaMaior}`)
            .first()
            .then((row) => {
                if (row == undefined) {
                    console.log("update")
                    app.db('tasks')
                        //.where({ taskIdPK: req.params.id, userIdFK: req.user.id })
                        .where({ taskIdPK: req.params.id })
                        .update({ desc, estimateAt, doneAt, userIdFK, clientIdFK, serviceIdFK })
                        .then(_ => res.status(204).send())
                        .catch(err => res.status(400).json(err))
                } else {
                    console.log("existe")
                    return res.status(400).json("Agendamento não permitido")
                }
            })       
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
