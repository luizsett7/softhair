
exports.up = function(knex) {
    return knex.schema.createTable('test', table => {
        table.increments('roleIdPK').primary()
        table.string('descricao').notNull() 
        table.datetime('datetime')           
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('test')
};
