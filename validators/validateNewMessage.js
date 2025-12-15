const { body } = require("express-validator");

const validateNewMessage = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title cannot be blank.")
        .isLength({ min: 1, max: 100 }).withMessage("Title must be between 1 & 50 characters."),

    body("message")
        .trim()
        .notEmpty().withMessage("Message cannot be empty.")
        .isLength({ min: 1, max: 100 }).withMessage("Message must be between 1 & 2000."),
];

module.exports = validateNewMessage;