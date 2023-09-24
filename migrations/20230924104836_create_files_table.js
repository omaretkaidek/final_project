/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('files', table => {
        table.increments('fileId').primary();
        table.string('oldName').notNullable();
        table.string('newName').notNullable();
        table.string('folder').notNullable();
        table.string('path').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('files');
};
