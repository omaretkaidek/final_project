// apartment.api.routes.js

const express = require("express");
const router = express.Router();
const bookController = require("../Controller/book-controller");
const fileUploadMiddleware = require('../../../middlewares/File-upload-middleware');
const { bookValidationRules, searchBooksValidationRules, bookSuggestionsValidationRules, bookIdValidation } = require('../validation/book-validation');


// Map the HTTP verbs to controller methods

// POST request to create a new user
router.post("/books", fileUploadMiddleware.single('pdfFile'),bookValidationRules,bookController.createBook);

router.get("/books/search", searchBooksValidationRules,bookController.searchBooks);

// Assuming you're using Express and you have a bookController
router.get('/books/suggestions', bookSuggestionsValidationRules, bookController.getBookSuggestions);


// For the GET API to read an apartment
router.get("/books/:id", bookIdValidation, bookController.getBookById);

// PUT request to update a user by ID
router.put("/books/:id", bookIdValidation, bookController.updateBookById);

// DELETE request to delete a user by ID
router.delete("/books/:id", bookIdValidation, bookController.deleteBookById);

module.exports = router;
