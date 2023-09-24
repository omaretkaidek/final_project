// BookController.js

const bookService = require('../service/book-service');
const fileService = require('../../file/service/file-service');
const { validationResult } = require('express-validator');
const { log } = require('console');

exports.createBook = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        
        if (req.file) {
            // Use the fileService to handle the file and get its ID
            const pdfFile = await fileService.uploadFile(req.file, "books");
            
            // Add the pdfFile (fileId) to the book data
            req.body.pdfFile = pdfFile;
            
            // Create the book
            const newBook = await bookService.createBook(req.body);
            console.log("Book created successfully");

        // Send back the appropriate response
            return res.status(201).json(newBook);
        }else{
            return res.status(404).send("please upload a pdf file");
        }
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
    try {
        const BookId = req.params.id;
        const Book = await bookService.getBookById(BookId);

        if (!Book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(Book);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateBookById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const BookId = req.params.id;
        const updatedData = req.body;

        const updatedBook = await bookService.updateBookById(BookId, updatedData);

        if (!updatedBook || updatedBook.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(updatedBook);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.deleteBookById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const BookId = req.params.id;

        const result = await bookService.deleteBookById(BookId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const { 
            query, 
            filter  // Default to 'any' if not provided
        } = req.query;

        const availableUnitsStart = parseInt(req.query.availableUnitsStart, 10);
        const availableUnitsEnd = parseInt(req.query.availableUnitsEnd, 10);
        const unitPriceStart = parseFloat(req.query.unitPriceStart, 10);
        const unitPriceEnd = parseFloat(req.query.unitPriceEnd, 10);

        const searchParams = {
            query, 
            filter,
            availableUnitsStart,
            availableUnitsEnd,
            unitPriceStart,
            unitPriceEnd
        };

        const results = await bookService.searchBooks(searchParams);
        res.json(results);
    } catch (error) {
        console.error('Error searching for books:', error); // Additional logging for troubleshooting
        res.status(500).send({ message: 'Error searching for books' });
    }
}

exports.getBookSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const { query } = req.query; // Get the search term from the query parameters
        const suggestions = await bookService.getBookSuggestions(query);
        res.json(suggestions);
    } catch (error) {
        console.error('Error getting book suggestions:', error);
        res.status(500).send({ message: 'Error getting book suggestions' });
    }
};






