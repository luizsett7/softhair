exports.up = function (knex, Promise) {
    return knex.schema.createTable('tasks', table => {
        table.increments('taskIdPK').primary()
        table.string('desc').notNull()
        table.datetime('estimateAt')
        table.datetime('doneAt')
        table.integer('userIdFK').references('userIdPK')
            .inTable('users').notNull()
        table.integer('clientIdFK').references('clientIdPK')
            .inTable('clients').notNull()
        table.integer('serviceIdFK').references('serviceIdPK')
            .inTable('services').notNull()    
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tasks')
};
