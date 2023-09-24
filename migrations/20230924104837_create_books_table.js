/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('books', table => {
        table.integer('bookId').primary();
        table.string('title').notNullable();
        table.integer('publisherId').references('publisherId').inTable('publishers').onDelete('CASCADE');
        table.date('publishDate').notNullable();
        table.integer('authorId').references('authorId').inTable('authors').onDelete('CASCADE');
        table.integer('pdfFile').nullable(); // This can be changed to reference 'fileId' in 'files' table after creating 'files' table
        table.string('tags').nullable();
        table.integer('availableUnits').notNullable();
        table.decimal('unitPrice').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
