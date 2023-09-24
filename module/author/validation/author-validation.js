const { body, param } = require('express-validator');
const knex = require('knex')(require('../../../knexfile'));
const countries = require('i18n-iso-countries');
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const id = param('id')
  .isNumeric()
  .withMessage("Id must be integer")
  .notEmpty()
  .withMessage('Author ID is required')
  .custom(async (value) => {
    const author = await knex('authors').where({ authorId: value }).first();
    if (!author) {
      return Promise.reject('Author ID does not exist');
    }
  });
  
  const firstName = body('firstName')
    .isString()
    .notEmpty()
    .withMessage('First name is required');
  
  const middleName = body('middleName')
    .isString()
    .notEmpty()
    .withMessage('Middle name is required');
  
  const lastName = body('lastName')
    .isString()
    .notEmpty()
    .withMessage('Last name is required');
  
  const dateOfBirth = body('dateOfBirth')
    .isDate()
    .withMessage('Birth date must be a valid date')
    .notEmpty()
    .withMessage('Birth date is required');
  
  const country = body('country')
    .isString()
    .notEmpty()
    .withMessage('Country is required')
    .custom((value) => {
      const countryNames = Object.values(countries.getNames('en'));
      return countryNames.includes(value);
    })
    .withMessage('Invalid country');
  
  const deathDate = body('deathDate')
    .optional()
    .isDate()
    .withMessage('Death date must be a valid date')
    .custom((value, { req }) => {
      const birthDate = new Date(req.body.dateOfBirth);
      const deathDate = new Date(value);
      return deathDate > birthDate;
    })
    .withMessage('Death date must be after birth date');
  
  const officialWebsite = body('officialWebsite')
    .optional()
    .isURL()
    .withMessage('Official website must be a valid URL');
  
  

const authorValidationRules = [
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    country,
    deathDate,
    officialWebsite
];
  
const idValidation = [
    id
];

module.exports = {
    authorValidationRules,
    idValidation,
};