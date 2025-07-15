"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const profile_1 = require("../controllers/users/profile");
const update_1 = require("../controllers/users/update");
const password_1 = require("../controllers/users/password");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticate, profile_1.getUserProfile);
router.patch('/', auth_1.authenticate, update_1.updateUser);
router.patch('/password', auth_1.authenticate, validation_1.passwordUpdateRules, validation_1.validateRequest, password_1.updatePassword);
exports.default = router;
//# sourceMappingURL=users.js.map