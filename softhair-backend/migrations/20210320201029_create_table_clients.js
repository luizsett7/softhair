
exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.increments('clientIdPK').primary()
        table.string('nome').notNull()
        table.string('cargo')  
        table.integer('ativo').defaultTo(1)     
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients')
};
