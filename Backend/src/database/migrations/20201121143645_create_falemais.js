
exports.up = function (knex) {
    return knex.schema.createTable('falemais', function (table) {
        table.integer('id').primary
        table.string('title').primary();
        table.integer('time').notNullable();
        
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('falemais');
};
