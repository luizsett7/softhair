
const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ userIdPK: payload.id })            
            .first()
            .then(user => {
                if (user) {
                    // se tem usuário, permite passar, continua a requisição e coloca os dados dentro da requisição
                    done(null, { id: user.userIdPK, email: user.email })
                } else {
                    // false, usuário não autenticado, barra a requisição
                    done(null, false)
                }
            })
            // não autenticou o usuário e passou o erro
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false }),
    }
}
