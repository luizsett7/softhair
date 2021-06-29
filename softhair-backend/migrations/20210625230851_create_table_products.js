
exports.up = function(knex) {
    return knex.schema.createTable('products', table => {
        table.increments('productIdPK').primary()
        table.string('descricao').notNull()                    
        table.float('valor').notNull()           
        table.string('urlImage').notNull()            
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
