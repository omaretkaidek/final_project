/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reservations', table => {
        table.increments('reservationId').primary();
        table.integer('bookId').references('bookId').inTable('books').onDelete('CASCADE');
        table.integer('numberOfUnits').notNullable();
        table.string('buyerName').notNullable();
        table.string('buyerAddress').notNullable();
        table.string('buyerPhone').notNullable();
        table.date('purchaseDate').notNullable();
        table.string('nationalId').notNullable();
        table.string('paymentMethod').notNullable();
        table.decimal('unitPrice').notNullable();
        table.decimal('totalPrice').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reservations');
};
