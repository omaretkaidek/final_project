// BookService.js

const bookModel = require('../model/book-model');

const bookService = {
    async createBook(bookData) {
        return await bookModel.createBook(bookData);
    },

    async getBookById(bookId) {
        return await bookModel.getBookById(bookId);
    },

    async updateBookById(bookId, updatedData) {
        return await bookModel.updateBookById(bookId, updatedData);
    },

    async deleteBookById(bookId) {
        return await bookModel.deleteBookById(bookId);
    },

    async setFileId(book, pdfFile) {
        return await bookModel.setFileId(book, pdfFile);
    },

    async searchBooks(params) {
        return await bookModel.searchBooks(params);
    },

    async getBookSuggestions(query) {
        return await bookModel.getBookSuggestions(query);
    },
    
};

module.exports = bookService;
