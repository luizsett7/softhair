
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('userIdPK').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.integer('roleIdFK').references('roleIdPK')
            .inTable('roles').notNull()
        table.integer('ativo').defaultTo(1)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
