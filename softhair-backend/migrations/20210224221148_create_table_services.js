
exports.up = function(knex) {
    return knex.schema.createTable('services', table => {
        table.increments('serviceIdPK').primary()
        table.string('descricao').notNull()            
        table.float('valor').notNull()
        table.integer('ativo').defaultTo(1)               
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('services')
};
