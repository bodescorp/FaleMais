
exports.up = function (knex) {
    return knex.schema.createTable('ddd', function (table) {
        table.integer('cod', 2).primary();
        table.string('region').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ddd');
};
