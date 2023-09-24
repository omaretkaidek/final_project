// bookModel.js

const knex = require('knex')(require('../../../knexfile'));

const tableName = 'books';

function buildRangeQuery(searchQuery, columnName, startValue, endValue) {
    if (!isNaN(startValue) && startValue !== undefined) {
        searchQuery.where(columnName, '>=', startValue);
    }
    if (!isNaN(endValue) && endValue !== undefined) {
        searchQuery.where(columnName, '<=', endValue);
    }
}


const bookModel = {
    async createBook(bookData) {
        return await knex(tableName).insert(bookData).returning('*');
    },

    async getBookById(bookId) {
        return await knex(tableName).where({ bookId }).first();
    },

    async updateBookBybookId(bookId, updatedData) {
        return await knex(tableName).where({ bookId }).update(updatedData).returning('*');
    },

    async deleteBookBybookId(bookId) {
        return await knex(tableName).where({ bookId }).del();
    },

    async bookIdBookExists(bookId) {
        const Book = await knex(tableName).where({ bookId }).first();
        return Boolean(Book);
    },

    async nameExists(name) {
        const Book = await knex(tableName).where({ name }).first();
        return Boolean(Book); 
    },

    async setFileId(bookId, pdfFile) {
            return await knex(tableName).where({ bookId: bookId }).update({ pdfFile: pdfFile });
    },

    async searchBooks(params) {
        let searchQuery = knex(tableName);
    
        // Add necessary joins for publisher and author
        searchQuery.leftJoin('publishers', 'books.publisherId', 'publishers.publisherId')
                   .leftJoin('authors', 'books.authorId', 'authors.authorId');
    
        switch (params.filter) {
            case 'title':
                searchQuery.where('books.title', 'like', `%${params.query}%`);
                break;
            case 'publisher':
                searchQuery.where('publishers.name', 'like', `%${params.query}%`);
                break;
            case 'author':
                // Concatenating firstName, middleName, and lastName with space in between
                searchQuery.where(
                    knex.raw("CONCAT(authors.firstName, ' ', IFNULL(authors.middleName, ''), ' ', authors.lastName)"), 
                    'like', 
                    `%${params.query}%`
                );
                break;
            case 'tags':
                searchQuery.where('books.tags', 'like', `%${params.query}%`);
                break;
            case 'any':
                searchQuery.where('books.title', 'like', `%${params.query}%`)
                           .orWhere('publishers.name', 'like', `%${params.query}%`)
                           .orWhere(
                                knex.raw("CONCAT(authors.firstName, ' ', IFNULL(authors.middleName, ''), ' ', authors.lastName)"), 
                                'like', 
                                `%${params.query}%`
                            )
                           .orWhere('books.tags', 'like', `%${params.query}%`);
                break;
            default:
                break;
        }
    
        buildRangeQuery(searchQuery, 'books.availableUnits', params.availableUnitsStart, params.availableUnitsEnd);
        buildRangeQuery(searchQuery, 'books.unitPrice', params.unitPriceStart, params.unitPriceEnd);
    
        return await searchQuery.select(
            'books.*', 
            'publishers.name as publisherName', 
            knex.raw("CONCAT(authors.firstName, ' ', IFNULL(authors.middleName, ''), ' ', authors.lastName) as authorName")
        );
    }
    ,

    async getBookSuggestions(query) {
        return await knex('books')
            .select(
                'books.bookId', 
                'books.title',
                'publishers.name as publisherName',
                'books.publishDate',
                knex.raw('CONCAT(authors.firstName, " ", COALESCE(authors.middleName, ""), " ", authors.lastName) as authorName'),
                'books.availableUnits',
                'books.unitPrice'
            )
            .leftJoin('publishers', 'books.publisherId', 'publishers.publisherId')
            .leftJoin('authors', 'books.authorId', 'authors.authorId')
            .where('books.title', 'like', `%${query}%`)
            .orWhere('books.bookId', 'like', `%${query}%`);
    }
    
    
};

module.exports = bookModel;