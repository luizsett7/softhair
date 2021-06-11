
exports.up = function(knex) {
    return knex.schema.createTable('empregados', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('cargo')     
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('empregados')
};
