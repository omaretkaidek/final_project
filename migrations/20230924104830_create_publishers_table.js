/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('publishers', table => {
        table.increments('publisherId').primary();
        table.string('name').notNullable();
        table.date('establishDate').notNullable();
        table.boolean('stillWorking').notNullable().defaultTo(true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('publishers');
};
