module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUsers)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUser)

    app.route('/users/:id/remove')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUser)
        .put(app.api.user.remove)

    app.route('/users/:id/:nome/:email/:role/:ativo/update')
        .all(app.config.passport.authenticate())
        .put(app.api.user.update)

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

    app.route('/tasks/:id/:descricao/:estimateat/:doneat/:employee/:usuario/:service/update')
        .all(app.config.passport.authenticate())
        .put(app.api.task.seleciona)

    app.route('/employees')
        .all(app.config.passport.authenticate())
        .get(app.api.employee.getEmployees)
        .post(app.api.employee.save)

    app.route('/ativeemployees')
        .all(app.config.passport.authenticate())
        .get(app.api.employee.getAtiveEmployees)

    app.route('/employees/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.employee.getEmployee)
        .put(app.api.employee.remove)

    app.route('/employees/:id/:nome/:cargo/:ativo/update')
        .all(app.config.passport.authenticate())
        .put(app.api.employee.seleciona)

    app.route('/services')
        .all(app.config.passport.authenticate())
        .get(app.api.service.getServices)
        .post(app.api.service.save)

    app.route('/ativeservices')
        .all(app.config.passport.authenticate())
        .get(app.api.service.getAtiveServices)

    app.route('/services/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.service.getService)
        .put(app.api.service.remove)

    app.route('/services/:id/:descricao/:valor/:ativo/update')
        .all(app.config.passport.authenticate())
        .put(app.api.service.seleciona)

    app.route('/products')
        .all(app.config.passport.authenticate())
        .get(app.api.product.getProducts)
        .post(app.api.product.save)

    app.route('/products/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.product.getProduct)
        .delete(app.api.product.remove)

    app.route('/products/:id/:descricao/:valor/update')
        .all(app.config.passport.authenticate())
        .put(app.api.product.seleciona)

    app.route('/roles')
        //.all(app.config.passport.authenticate())
        .get(app.api.role.getRoles)
        .post(app.api.role.save)
}
