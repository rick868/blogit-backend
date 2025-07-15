"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordUpdateRules = exports.blogCreateRules = exports.registerRules = exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateRequest = validateRequest;
exports.registerRules = [
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage('Last name is required'),
    (0, express_validator_1.body)('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];
exports.blogCreateRules = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('synopsis').notEmpty().withMessage('Synopsis is required'),
    (0, express_validator_1.body)('content').notEmpty().withMessage('Content is required')
];
exports.passwordUpdateRules = [
    (0, express_validator_1.body)('currentPassword').notEmpty().withMessage('Current password is required'),
    (0, express_validator_1.body)('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
];
//# sourceMappingURL=validation.js.map