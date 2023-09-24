// AuthorService.js

const authorModel = require("../model/author-model");
const bcrypt = require("bcrypt");

const authorService = {
  async createAuthor(authorData) {
    return await authorModel.createAuthor(authorData);
  },
  // Retrieve a Author by ID
  async getAuthorById(authorId) {
    return await authorModel.getAuthorById(authorId);
  },
};

module.exports = authorService;
