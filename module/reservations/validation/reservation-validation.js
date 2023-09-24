const { body } = require("express-validator");
const knex = require("knex")(require("../../../knexfile"));

const reservationIdValidator = body("reservationId")
  .isInt()
  .withMessage("Reservation ID must be an integer")
  .custom(async (value) => {
    const reservation = await knex("reservations")
      .where({ reservationId: value })
      .first();
    if (reservation) {
      return Promise.reject("Reservation ID already exists in the database");
    }
  });

const bookIdValidator = body("bookId")
  .isInt()
  .withMessage("Book ID must be an integer")
  .custom(async (value) => {
    const book = await knex("books").where({ bookId: value }).first();
    if (!book) {
      return Promise.reject("Book ID does not exist in the database");
    }
  });

const numberOfUnitsValidator = body("numberOfUnits")
  .isInt({ min: 1 })
  .withMessage("Number of Units must be a positive integer");

const buyerNameValidator = body("buyerName")
  .isString()
  .withMessage("Buyer Name must be a string")
  .notEmpty()
  .withMessage("Buyer Name is required");

const buyerAddressValidator = body("buyerAddress")
  .isString()
  .withMessage("Buyer Address must be a string")
  .notEmpty()
  .withMessage("Buyer Address is required");

const buyerPhoneValidator = body("buyerPhone")
  .isString()
  .withMessage("Buyer Phone must be a string")
  .notEmpty()
  .withMessage("Buyer Phone is required");

const purchaseDateValidator = body("purchaseDate")
  .isDate()
  .withMessage("Purchase Date must be a valid date")
  .notEmpty()
  .withMessage("Purchase Date is required");

const nationalIdValidator = body("nationalId")
  .isString()
  .withMessage("National ID must be a string")
  .notEmpty()
  .withMessage("National ID is required");

const paymentMethodValidator = body("paymentMethod")
  .isString()
  .withMessage("Payment Method must be a string")
  .notEmpty()
  .withMessage("Payment Method is required")
  .equals("Cash")
  .withMessage("Payment Method must be Cash");

const unitPriceValidator = body("unitPrice")
  .isFloat({ min: 0 })
  .withMessage("Unit Price must be a positive number");

const totalPriceValidator = body("totalPrice")
  .isFloat({ min: 0 })
  .withMessage("Total Price must be a positive number");

const createReservationValidationRules = [
  bookIdValidator,
  numberOfUnitsValidator,
  buyerNameValidator,
  buyerAddressValidator,
  buyerPhoneValidator,
  purchaseDateValidator,
  nationalIdValidator,
  paymentMethodValidator,
  unitPriceValidator,
  totalPriceValidator,
];

const idValidator = [reservationIdValidator];

module.exports = {
  createReservationValidationRules,
  idValidator,
};
