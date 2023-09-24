/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('authors', table => {
        table.increments('authorId').primary();
        table.string('firstName').notNullable();
        table.string('middleName').nullable();
        table.string('lastName').notNullable();
        table.date('dateOfBirth').nullable();
        table.string('country').nullable();
        table.date('deathDate').nullable();
        table.string('officialWebsite').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('authors');
};
