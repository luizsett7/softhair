
exports.up = function(knex) {
    return knex.schema.createTable('roles', table => {
        table.increments('roleIdPK').primary()
        table.string('descricao').notNull()            
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('roles')
};
