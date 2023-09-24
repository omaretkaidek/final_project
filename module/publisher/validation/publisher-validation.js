const { body, param } = require("express-validator");
const knex = require("knex")(require("../../../knexfile"));

const name = body("name")
  .isString()
  .withMessage("Name must be a string")
  .notEmpty()
  .withMessage("Name is required");

const establishDate = body("establishDate")
  .isDate()
  .withMessage("Establish Date must be a valid date")
  .notEmpty()
  .withMessage("Establish Date is required")
  .custom((value) => {
    const establishDate = new Date(value);
    const today = new Date();

    // Set the time part to 00:00:00.000
    today.setHours(0, 0, 0, 0);

    if (establishDate >= today) {
      throw new Error("Establish Date must be before today’s date");
    }

    return true;
  });

const stillWorking = body("stillWorking")
  .isBoolean()
  .withMessage("Still Working must be a boolean")
  .notEmpty()
  .withMessage("Still Working is required");

const id = param("id")
  .isInt()
  .withMessage("ID must be an integer")
  .custom(async (value) => {
    const publisher = await knex("publishers")
      .where({ publisherId: value })
      .first();
    if (!publisher) {
      return Promise.reject("Publisher ID does not exist in the database");
    }
  });

const idValidation = [id];

const createPublisherValidationRules = [name, establishDate, stillWorking];

module.exports = {
  createPublisherValidationRules,
  idValidation,
};
