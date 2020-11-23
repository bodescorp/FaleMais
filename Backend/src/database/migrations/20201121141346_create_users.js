
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.string('cpf').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();

        table.integer('falemais_id').notNullable();

        table.foreign('falemais_id').references('id').inTable('falemais');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
