
exports.up = function(knex) {
    return knex.schema.createTable('employees', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('cargo')  
        table.string('ativo')      
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('employees')
};
