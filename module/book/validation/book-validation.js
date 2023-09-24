const { body } = require('express-validator');
const knex = require('knex')(require('../../../knexfile'));

const bookId = body('bookId')
  .isInt().withMessage('Book ID must be an integer')
  .custom(async (value) => {
    const book = await knex('books').where({ bookId: value }).first();
    if (book) {
      return Promise.reject('Book ID already exists');
    }
  });

const title = body('title')
  .isString().withMessage('Title must be a string')
  .notEmpty().withMessage('Title is required');

const publisherId = body('publisherId')
  .isInt().withMessage('Publisher ID must be an integer')
  .custom(async (value) => {
    const publisher = await knex('publishers').where({ publisherId: value }).first();
    if (!publisher) {
      return Promise.reject('Publisher ID does not exist');
    }
  });

const publishDate = body('publishDate')
  .isDate().withMessage('Publish Date must be a valid date')
  .notEmpty().withMessage('Publish Date is required');

const authorId = body('authorId')
  .isInt().withMessage('Author ID must be an integer')
  .custom(async (value) => {
    const author = await knex('authors').where({ authorId: value }).first();
    if (!author) {
      return Promise.reject('Author ID does not exist');
    }
  });

const pdfFile = body('pdfFile')
  .isInt().withMessage('PDF File ID must be an integer')
  .custom(async (value) => {
    const file = await knex('files').where({ fileId: value }).first();
    if (!file) {
      return Promise.reject('PDF File ID does not exist');
    }
  });

const tags = body('tags')
  .optional()
  .isString().withMessage('Tags must be a string');

const availableUnits = body('availableUnits')
  .isInt({ min: 0 }).withMessage('Available Units must be an integer greater than or equal to 0');

const unitPrice = body('unitPrice')
  .isDecimal().withMessage('Unit Price must be a decimal')
  .custom(value => value > 0).withMessage('Unit Price must be greater than 0');

const { query } = require('express-validator');

  const queryValidator = query('query')
    .optional()
    .isString()
    .withMessage('Query must be a string');
  
  const filterValidator = query('filter')
    .optional()
    .isString()
    .withMessage('Filter must be a string');
  
  const availableUnitsStartValidator = query('availableUnitsStart')
    .optional()
    .isInt({ min: 0 })
    .withMessage('availableUnitsStart must be a positive integer')
    .toInt();
  
  const availableUnitsEndValidator = query('availableUnitsEnd')
    .optional()
    .isInt({ min: 0 })
    .withMessage('availableUnitsEnd must be a positive integer')
    .toInt()
    .custom((value, { req }) => {
      if (req.query.availableUnitsStart && value < req.query.availableUnitsStart) {
        throw new Error('availableUnitsEnd must be greater than or equal to availableUnitsStart');
      }
      return true;
    });
  
  const unitPriceStartValidator = query('unitPriceStart')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('unitPriceStart must be a positive number')
    .toFloat();
  
  const unitPriceEndValidator = query('unitPriceEnd')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('unitPriceEnd must be a positive number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.query.unitPriceStart && value < req.query.unitPriceStart) {
        throw new Error('unitPriceEnd must be greater than or equal to unitPriceStart');
      }
      return true;
    });


const bookSuggestionsValidationRules = [queryValidator];
  
  const searchBooksValidationRules = [
    queryValidator,
    filterValidator,
    availableUnitsStartValidator,
    availableUnitsEndValidator,
    unitPriceStartValidator,
    unitPriceEndValidator
  ];
  
const bookValidationRules = [
  bookId, 
  title, 
  publisherId, 
  publishDate, 
  authorId, 
  pdfFile, 
  tags, 
  availableUnits, 
  unitPrice
];

const bookIdValidation = [bookId]

module.exports = {
  bookValidationRules,
  searchBooksValidationRules,
  bookSuggestionsValidationRules,
  bookIdValidation
};
