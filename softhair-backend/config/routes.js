module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.get('/users', app.api.user.getUsers)

    app.route('/tasks')
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save)

    app.route('/tasks/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTask)
        .delete(app.api.task.remove)

    app.route('/tasks/:id/toggle')
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)

    app.route('/tasks/:id/:descricao/:estimateat/:doneat/:employee/:usuario/update')
        .all(app.config.passport.authenticate())
        .put(app.api.task.seleciona)  
        
    app.route('/employees')
        .all(app.config.passport.authenticate())
        .get(app.api.employee.getEmployees)
        .post(app.api.employee.save)

        app.route('/employees/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.employee.getEmployee)
        .delete(app.api.employee.remove)

        app.route('/employees/:id/:nome/:cargo/update')
        .all(app.config.passport.authenticate())
        .put(app.api.employee.seleciona) 
        
        app.route('/roles')
        //.all(app.config.passport.authenticate())
        .get(app.api.role.getRoles)
        .post(app.api.role.save)
}
