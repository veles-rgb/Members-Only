const { body } = require("express-validator");

const validateRegister = [
    body("fullname")
        .trim()
        .notEmpty().withMessage("Name cannot be empty.")
        .isLength({ min: 1, max: 100 }).withMessage("Name must be between 1 & 100 characters."),

    body("username")
        .trim()
        .notEmpty().withMessage("Username cannot be empty.")
        .isLength({ min: 3, max: 50 }).withMessage("Username must be between 3 & 50 characters.")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores.")
        .toLowerCase(),

    body("password")
        .notEmpty().withMessage("Password cannot be empty.")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),

    body("confirmPassword")
        .notEmpty().withMessage("Confirm password cannot be empty.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm password does not match password.");
            }
            return true;
        }),
];

module.exports = validateRegister;